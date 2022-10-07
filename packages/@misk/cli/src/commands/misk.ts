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
    multibind<DashboardTab>().toProvider(
      DashboardTabProvider<AdminDashboard>(
        name = "${miskTab.name}",
        slug = "${miskTab.slug}",
        url_path_prefix = "/_admin/${miskTab.slug}/",
        category = "{add menu category to group the tab}",
        capabilities = setOf("optional list", "of authenticated capabilities",
          "who can see the tab")
      )
    )
  `
  const dashboardTabProviderBinding = `
    multibind<DashboardTab>().toProvider(
      DashboardTabProvider<AdminDashboard, YOUR_CUSTOM_ACCESS_ANNOTATION>(
        name = "${miskTab.name}",
        slug = "${miskTab.slug}",
        url_path_prefix = "/_admin/${miskTab.slug}/",
        category = "{add menu category to group the tab}"
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
Go to the Misk-Web docs to learn more about each of the multibindings and configuration generated below to use your tabs in a Misk service.

https://cashapp.github.io/misk-web/docs/guides/integrating-with-misk/1-admin-dashboard


Dashboard Tab Binding for '${miskTab.slug}':

--------------------------------------------------------------------------------
${dashboardTabBinding}
--------------------------------------------------------------------------------

Dashboard Tab Binding with Access Annotation for '${miskTab.slug}':

--------------------------------------------------------------------------------
${dashboardTabProviderBinding}
--------------------------------------------------------------------------------

Web Tab Resource Module Binding for '${miskTab.slug}':

--------------------------------------------------------------------------------
${webTabResourceModuleBinding}
--------------------------------------------------------------------------------

Gradle configuration for '${miskTab.slug}':

--------------------------------------------------------------------------------
service/build.gradle (Groovy)
--------------------------------------------------------------------------------
sourceSets {
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
  return Promise.resolve()
}
export const handler = async (yargs: any) =>
  handleCommand(yargs, handlerFn, ["e", "each"])
