package com.squareup.`misk-web-plugin`

import java.io.File
import java.io.IOException
import java.time.LocalDateTime
import java.util.concurrent.TimeUnit
import java.util.UUID
import okhttp3.OkHttpClient
import okhttp3.Request
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

  fun npmVersion(url: String): String? {
    var version: String? = null
    try {
      val client = OkHttpClient()
      val request = Request.Builder().url(url).build()
      val response = client.newCall(request).execute()
      val responseUrl = response.request().url().toString()
      version = responseUrl.split("@").last().dropLast(1)
      response.close()
    } catch (ignored: java.io.IOException) {
      println("Failed to fetch ${ignored.message}")
    } catch (error: Throwable) {
      println("Response failure ${error.message}")
    }
    println("Misk-Web Build v${version}")
    return version
  }

  fun cliBuild(path: String): String {
    return "cd $path && pwd && npm install -g @misk/cli && npm install && miskweb build"
  }

  fun cliStart(path: String): String {
    return "cd $path && pwd && npm install -g @misk/cli && npm install && miskweb start"
  }

  override fun apply(project: Project) {
    project.run {
      println("touch /tmp/h2 && touch /tmp/t2 && pwd".runCommand())
      tasks {
        register("webBuild", Task::class) {
          val packagesPaths = recursiveFind(project, "/web/packages", 2)
          packagesPaths.forEach {
            println(it)
            val cmd = cliBuild("${project.projectDir}${it}")
            println(cmd)
            println(cmd.runCommand())
          }
          val tabPaths = recursiveFind(project, "/web/tabs/", 3)
          tabPaths.forEach {
            println(it)
            val cmd = cliBuild("${project.projectDir}${it}")
            println(cmd)
            println(cmd.runCommand())
          }
        }

        register("webStart", Task::class) {
          val tabPaths = recursiveFind(project, "/web/tabs/", 3)
          tabPaths.forEach {
            println(it)
            println(cliStart(it).runCommand())
          }
        }
      }
    }
  }
}
