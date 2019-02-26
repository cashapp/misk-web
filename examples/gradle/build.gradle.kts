buildscript {
  val miskWebPluginArtifact by rootProject.extra { "com.squareup.misk-web-plugin:misk-web-plugin" }
  val miskWebPluginVersion by rootProject.extra { "201902261411-fe46101" }
}

tasks {

  val mwpGroovyLocal by registering(GradleBuild::class) {
    dir = file("misk-web-plugin-groovy-local")
    tasks = listOf("webBuild")
  }

  val mwpKotlinLocal by registering(GradleBuild::class) {
    dir = file("misk-web-plugin-kotlin-dsl-local")
    tasks = listOf("webBuild")
  }

  // Integration test using locally built version of `misk-web-plugin`
  register("testlocal") {
    dependsOn(listOf(mwpGroovyLocal, mwpKotlinLocal))
  }

  val mwpGroovyM2 by registering(GradleBuild::class) {
    dir = file("misk-web-plugin-groovy-m2")
    tasks = listOf("webBuild")
  }

  val mwpKotlinM2 by registering(GradleBuild::class) {
    dir = file("misk-web-plugin-kotlin-dsl-m2")
    tasks = listOf("webBuild")
  }

  // Integration test using public published Gradle M2 version of `misk-web-plugin`
  register("testm2") {
    dependsOn(listOf(mwpGroovyM2, mwpKotlinM2))
  }
}
