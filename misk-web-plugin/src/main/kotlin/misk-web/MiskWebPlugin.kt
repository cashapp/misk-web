package `misk-web-plugin`

import java.io.File
import java.io.IOException
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit
import java.util.UUID
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.Task
import org.gradle.api.tasks.Copy
import org.gradle.kotlin.dsl.*

open class MiskWebPlugin : Plugin<Project> {
  fun String.runCommand(
    workingDir: File = File("."),
    timeoutAmount: Long = 30,
    timeoutUnit: TimeUnit = TimeUnit.SECONDS
  ): String? {
    return try {
      ProcessBuilder(*this.split("\\s".toRegex()).toTypedArray())
          .directory(workingDir)
          .redirectOutput(ProcessBuilder.Redirect.PIPE)
          .redirectError(ProcessBuilder.Redirect.PIPE)
          .start().apply {
            waitFor(timeoutAmount, timeoutUnit)
          }.inputStream.bufferedReader().readText()
    } catch (e: IOException) {
      e.printStackTrace()
      null
    }
  }

  fun Any.relPath(projectDir: String): String {
    return this.toString().split(projectDir)[1]
  }

  fun recursiveFind(project: Project, prefix: String, depth: Int): List<String> {
    val found = mutableListOf<String>()
    val projectDir: String = project.projectDir.toString()
    File(projectDir).walk().maxDepth(depth).filter {
      it.relPath(projectDir).startsWith(prefix) && !it.relPath(projectDir).endsWith(".DS_Store")
    }.forEach {
      found += it.relPath(projectDir)
    }
    return found
  }

  fun simpleFlatJsonToMap(dirPath: String): MutableMap<String, Any> {
    val markup = listOf("{", "}", ",")
    val jsonMap = mutableMapOf<String, Any>()
    var jsonString: String
    try {
      jsonString = File("${dirPath}/miskTab.json").readText(Charsets.UTF_8)
    } catch (error: Throwable) {
      return jsonMap
    }
    val jsonArray =
        jsonString.replace("\n", "").replace(":", "").replace(",", "").split('"').map { it.trim() }
    var prev = ""
    var prevFlag = false
    for (item in jsonArray) {
      if (item.isNotBlank() && markup.all { !item.contains(it) }) {
        if (prevFlag) {
          jsonMap[prev] = item
          prevFlag = false
        } else {
          prev = item
          prevFlag = true
        }
      }
    }
    return jsonMap
  }

  fun hashDir(project: Project, relPath: String) {
    val uname = "uname".runCommand()
    println(uname)
    var hashBinary = if ("${uname}".contains("Darwin")) {
      "md5"
    } else {
      "md5sum"
    }
    println("${hashBinary} ${project.projectDir}${relPath}")
    val hashCmd =
        "tar --exclude=\"cachedUrls\" --exclude=\"lib\" --exclude=\"node_modules\" --exclude=\".DS_Store\" --exclude=\".hash\" --exclude=\"yarn.lock\" -cf - ${project.projectDir}${relPath} | ${hashBinary} 2>&1"
    println(hashCmd)
    println("\n\n")
    val hash = hashCmd.runCommand()
    println("\n\n${hash}")
  }

  fun String.slugify(): String {
    return this.replace("/", "-").replace(":", "-").replace(".", "-")
  }

  fun timeHash(): String {
    val dateHash = LocalDateTime.now().toString().slugify().slice(11..18).replace("-", ".")
    val hash = UUID.randomUUID().toString().slice(0..6)
    return "${hash}-${dateHash}"
  }

  fun dockerBuildContainerName(relPath: String): String {
    return "${timeHash()}-misk${relPath.slugify()}"
  }

  fun dockerBuildContainer(
    project: Project,
    relPath: String,
    mountPath: String = relPath,
    name: String = dockerBuildContainerName(relPath),
    runtime: String = "/bin/misk-web -n -g"
  ): String {
    val volume = "${project.projectDir}${relPath}:${mountPath}"

    val port = simpleFlatJsonToMap("${project.projectDir}${relPath}").get("port")
    val portStmt = if (port is Int) {
      " -p ${port}:${port}"
    } else {
      ""
    }

    val image =
        simpleFlatJsonToMap("${project.projectDir}${relPath}").get("image") ?: "squareup/misk-web"
    val imageVersion =
        simpleFlatJsonToMap("${project.projectDir}${relPath}").get("version") ?: "0.1.3"
    val command =
        "docker run --rm --name ${name} -v ${volume}${portStmt} ${image}:${imageVersion} ${runtime}"
    return command
  }

  fun dockerInformation(dockerName: String, dockerCmd: String): String {
    return """
    |  Container Name: ${dockerName}
    |  Logs:    $ docker logs -f ${dockerName}
    |  Command: $ ${dockerCmd}
    """.trimMargin()
  }

  override fun apply(project: Project) {
    project.run {
      tasks {
        register("webBuild", Task::class) {
          val packagesPaths = recursiveFind(project, "/web/packages", 2)
          packagesPaths.forEach {
            val dockerName = dockerBuildContainerName(it)
            val dockerCmd = dockerBuildContainer(project, it, mountPath = "/web", name = dockerName)
            println(dockerInformation(dockerName, dockerCmd))
            println(dockerCmd.runCommand())
          }
          val tabPaths = recursiveFind(project, "/web/tabs/", 3)
          tabPaths.forEach {
            val dockerName = dockerBuildContainerName(it)
            val dockerCmd = dockerBuildContainer(project, it, name = dockerName)
            println(dockerInformation(dockerName, dockerCmd))
            println(dockerCmd.runCommand())
          }
        }

        register("webStart", Task::class) {
          val tabPaths = recursiveFind(project, "/web/tabs/", 3)
          tabPaths.forEach {
            val dockerName = dockerBuildContainerName(it)
            val dockerCmd = dockerBuildContainer(project, it, name = dockerName, runtime = "/bin/misk-web -n -d")
            println(dockerInformation(dockerName, dockerCmd))
            println(dockerCmd.runCommand())
          }
        }
      }
    }
  }
}
