plugins {
  `kotlin-dsl`
}

gradlePlugin {
  plugins {
    register("misk-web-plugin-version") {
      id = "misk-web-plugin-version"
      implementationClass = "MiskWebPluginVersion"
    }
  }
}

dependencies {
  compile("com.squareup.okhttp3:okhttp:3.14.9")
}

repositories {
  jcenter()
}
