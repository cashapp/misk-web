ext.set("isCi", "true" == System.getenv("CI"))

tasks {
  val plugin by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("publish")
  }

  val jar by registering(GradleBuild::class) {
    dir = file("misk-web")
    tasks = listOf("webBuild", "jar")
  }

  jar {
    dependsOn(plugin)
  }
}
