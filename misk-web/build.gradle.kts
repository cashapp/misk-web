import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  java
  kotlin("jvm")
  `kotlin-dsl`
//  id("com.vanniktech.maven.publish")
}

apply(from = rootProject.file("gradle/web.gradle"))

val compileKotlin: KotlinCompile by tasks
compileKotlin.kotlinOptions {
  jvmTarget = "1.8"
  allWarningsAsErrors = true
}

val compileTestKotlin: KotlinCompile by tasks
compileTestKotlin.kotlinOptions {
  jvmTarget = "1.8"
  allWarningsAsErrors = true
}

project.the<SourceSetContainer>()["main"].resources.srcDirs(listOf(
    "web/@misk/common/lib",
    "web/@misk/components/lib",
    "web/@misk/dev/lib",
    "web/@misk/tslint/lib")
).exclude("**/node_modules")

val jar: Jar by tasks
jar.dependsOn("web")

if (rootProject.file("hooks.gradle").exists()) {
  apply(from = rootProject.file("hooks.gradle"))
}
