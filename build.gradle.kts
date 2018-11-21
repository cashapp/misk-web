ext.set("isCi", "true" == System.getenv("CI"))
apply(from = rootProject.file("./dependencies.gradle"))

subprojects {
  buildscript {
    repositories {
      mavenCentral()
      jcenter()
    }

    dependencies {
      classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.2.51")
      classpath("com.github.jengelman.gradle.plugins:shadow:2.0.2")
      classpath("com.vanniktech:gradle-maven-publish-plugin:0.4.0")
    }
  }
  repositories {
    mavenCentral()
    jcenter()
  }
}
