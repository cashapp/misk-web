tasks {
  val plugin by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("publish")
  }

  val pluginPublic by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("publish", "publishPlugins")
  }

  val assemble by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("assemble")
  }
}
