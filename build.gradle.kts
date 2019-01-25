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

  val example by registering(GradleBuild::class) {
    dir = file("examples/gradle")
    tasks = listOf("example")
  }

  example {
    dependsOn(plugin)
  }

  val test by registering(GradleBuild::class) {
    dir = file("examples/gradle")
    tasks = listOf("test")
  }

  test {
    dependsOn(plugin)
  }
}
