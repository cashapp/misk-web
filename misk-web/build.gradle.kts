plugins {
  id("misk-web-plugin") version "0.1.3"
  `kotlin-dsl`
  `maven-publish`
}

sourceSets {
  main {
    resources {
      setSrcDirs(listOf(
          "web/packages/@misk/common/lib",
          "web/packages/@misk/core/lib",
          "web/packages/@misk/dev/lib",
          "web/packages/@misk/tslint/lib"
      ))
      exclude("**/node_modules")
    }
  }
}

publishing {
  repositories {
    maven(url = "build/repository")
  }
}

if (rootProject.file("hooks.gradle").exists()) {
  apply(from = rootProject.file("hooks.gradle"))
}
