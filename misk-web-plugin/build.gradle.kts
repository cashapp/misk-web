plugins {
    `kotlin-dsl`
    `maven-publish`
}

group = "misk-web-plugin"
version = "0.1.3"

gradlePlugin {
    plugins {
        register("MiskWebPlugin") {
            id = "misk-web-plugin"
            implementationClass = "misk-web-plugin.MiskWebPlugin"
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
