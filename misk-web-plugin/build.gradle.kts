plugins {
  `kotlin-dsl`
  `maven-publish`
  `java-gradle-plugin`
  id("com.gradle.plugin-publish") version "0.10.0"
  `misk-web-plugin-version`
}

dependencies {
  compile("com.squareup.okhttp3:okhttp:4.10.0")
}

pluginBundle {
  website = "https://github.com/cashapp/misk-web"
  vcsUrl = "https://github.com/cashapp/misk-web"
  tags = listOf("misk", "misk-web")
}

group = "com.squareup.misk-web-plugin"

gradlePlugin {
  plugins {
    create("MiskWebPlugin") {
      id = "com.squareup.misk-web-plugin"
      displayName = "Misk-Web Plugin"
      description = "Web build tasks for to compile your Misk-Web tabs in a Gradle project."
      implementationClass = "com.squareup.misk-web-plugin.MiskWebPlugin"
    }
  }
}

publishing {
  repositories {
    maven(url = "build/repository")
  }
}

repositories {
  jcenter()
}
