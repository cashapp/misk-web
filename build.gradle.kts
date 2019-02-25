tasks {
  val plugin by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("publish")
  }

  val pluginPublic by registering(GradleBuild::class) {
    dir = file("misk-web-plugin")
    tasks = listOf("publish", "publishPlugins")
  }

  val jar by registering(GradleBuild::class) {
    dir = file("misk-web")
    tasks = listOf("jar")
  }

  jar {
    dependsOn(plugin)
  }

  val uploadArchives by registering(GradleBuild::class) {
    dir = file("misk-web")
    tasks = listOf("uploadArchives")
  }

  uploadArchives {
    dependsOn(jar)
  }

  val testlocal by registering(GradleBuild::class) {
    dir = file("examples/gradle")
    tasks = listOf("testlocal")
  }

  testlocal {
    dependsOn(plugin)
  }

  val testm2 by registering(GradleBuild::class) {
    dir = file("examples/gradle")
    tasks = listOf("testm2")
  }

  testm2 {
    dependsOn(plugin)
  }
}
