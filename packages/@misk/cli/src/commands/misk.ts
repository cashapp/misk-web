import {
  logDebug,
  handleCommand,
  parseArgs,
  IMiskTabJSON,
  readMiskTabJson
} from "../utils"
export const command = "misk"
export const desc =
  "generate multibindings to configure tab with a Misk service\n"
export const handlerFn = async (...args: any) => {
  logDebug(command, desc)
  const { dir } = parseArgs(...args)
  const miskTab: IMiskTabJSON = readMiskTabJson(dir)
  const dashboardTabBinding = `
    multibind<DashboardTab, AdminDashboardTab>().toInstance(DashboardTab(
      name = "${miskTab.name}",
      slug = "${miskTab.slug}",
      url_path_prefix = "/_admin/${miskTab.slug}/",
      category = "{add menu category to group the tab}",
      capabilities = setOf("optional list", "of authenticated capabilities",
        "who can see the tab")
    ))
  `
  const webTabResourceModuleBinding = `
    install(WebTabResourceModule(
      environment = environment,
      slug = "${miskTab.slug}",
      web_proxy_url = "http://localhost:${miskTab.port}/"${
    miskTab.output_path === `lib/web/_tab/${miskTab.slug}`
      ? ""
      : `,
      url_path_prefix = "/${miskTab.relative_path_prefix}",
      resourcePath = "classpath:/web/${miskTab.relative_path_prefix}"`
  }
    ))
  `
  const multibindingsMessage = `
How to Add Tab ${miskTab.slug} to your Misk Service
===

Add the following multibindings to a KAbstractModule in a Misk service.
If you have many tabs, it may make sense to create a dedicated
  {Service Name}AdminDashboardModule.kt

Note that there are areas in the generated multibindings below that you will
  need to fill out or customize to your specific use case.
The generated bindings assume you want to add your tab to the default Misk
  Admin Dashboard available at /_admin/ in a Misk service.

Dashboard Tab Binding
===
The Dashboard Tab multibinding adds a menu link for your tab to the Misk Admin
  Dashboard.
It is organized by link category and can also carry authentication permissions
  so that tabs only show up to appropriately authenticated users.

Dashboard Tab Binding for ${miskTab.slug}:

--------------------------------------------------------------------------------
${dashboardTabBinding}
--------------------------------------------------------------------------------

Web Tab Resource Module Binding
===
The Web Tab Resource Module multibinding tells Misk where to find the compiled
  tab code. It lives in two places:

- In Classpath/JAR path ${miskTab.output_path} after running $ miskweb build
- Served from Webpack-Dev-Server over localhost on port ${
    miskTab.port
  } when running $ miskweb start

Web Tab Resource Module Binding for ${miskTab.slug}:

--------------------------------------------------------------------------------
${webTabResourceModuleBinding}
--------------------------------------------------------------------------------

AdminDashboardTestingModule
===
To run your Misk Admin Dashboard in DEVELOPMENT or TESTING environments, you'll
  need to add the AdminDashboardTestingModule to your primary service
  applicationModules() function.

It will look something like below.

--------------------------------------------------------------------------------
DinoService.kt
--------------------------------------------------------------------------------
  fun main(args: Array<String>) {
    ServiceBuilder.getMiskApplication(::applicationModules).run(args)
  }

  fun applicationModules(serviceBuilder: ServiceBuilder<DinoConfig>):
    List<KAbstractModule> {
    val modules = mutableListOf(
        ConfigModule.create("dino", serviceBuilder.config),
        DinoAccessModule(),
        DinoActionModule(),
        DinoAdminDashboardModule(serviceBuilder.env)
        DinoPersistenceModule(serviceBuilder.config),
        EnvironmentModule(serviceBuilder.env)
    )

    when (serviceBuilder.env) {
      Environment.PRODUCTION, Environment.STAGING -> {
        modules.addAll(listOf(
            JurassicRealModule(serviceBuilder.env,
              serviceBuilder.config.jurassic)
        ))
      }
      Environment.DEVELOPMENT, Environment.TESTING -> {
        modules.addAll(listOf(
            JurassicTestingModule(serviceBuilder.env,
              serviceBuilder.config.jurassic),
            AdminDashboardTestingModule(serviceBuilder.env)
        ))
      }
    }

    return modules
  }
--------------------------------------------------------------------------------

service/build.gradle
===
You'll need to add your tabs to the build.gradle main.resources so that they are wrapped up in your service jar. Add the Gradle stanza below.

--------------------------------------------------------------------------------
service/build.gradle (Groovy)
--------------------------------------------------------------------------------
sourceSets {
  main.java.srcDirs += 'src/main/kotlin/'
  test.java.srcDirs += 'src/test/kotlin/'
  main.resources {
    srcDirs += [
            'web/tabs/${miskTab.slug}/lib'
    ]
    exclude '**/node_modules'
  }
}
--------------------------------------------------------------------------------

  Done!
  Boot your service and your tab will be at:

    http://localhost:8080/_admin/${miskTab.slug}/
`
  console.log(multibindingsMessage)
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
