tasks {

    val mwpGroovyExample by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-groovy")
        tasks = listOf("webBuild")
    }

    val mwpKotlinExample by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-kotlin-dsl")
        tasks = listOf("webBuild")
    }

    register("example") {
        dependsOn(listOf(mwpGroovyExample, mwpKotlinExample))
    }


    val mwpGroovyTest by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-groovy-test")
        tasks = listOf("webBuild")
    }

    val mwpKotlinTest by registering(GradleBuild::class) {
        dir = file("misk-web-plugin-kotlin-dsl-test")
        tasks = listOf("webBuild")
    }

    register("test") {
        dependsOn(listOf(mwpGroovyTest, mwpKotlinTest))
    }
}
