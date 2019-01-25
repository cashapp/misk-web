tasks {

    val mwpGroovyTest by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-groovy")
        tasks = listOf("webBuild")
    }

    val mwpKotlinTest by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-kotlin-dsl")
        tasks = listOf("webBuild")
    }

    register("test") {
        dependsOn(listOf(mwpGroovyTest, mwpKotlinTest))
    }
}
