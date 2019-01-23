plugins {
    `kotlin-dsl`
    `maven-publish`
}

group = "misk-web"
version = "1.0"

gradlePlugin {
    plugins {
        register("MiskWebPlugin") {
            id = "misk-web-plugin"
            implementationClass = "misk-web.MiskWebPlugin"
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
