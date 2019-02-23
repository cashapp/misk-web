import java.io.File
import java.io.IOException
import java.util.concurrent.TimeUnit
import okhttp3.OkHttpClient
import okhttp3.Request
import org.gradle.api.Plugin
import org.gradle.api.Project

open class MiskWebPluginVersion : Plugin<Project> {
  fun String.execute(
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

  fun versionName(): String = "git show -s --format=%cI".execute()!!.slice(0..15).replace("-",
      "").replace("T", "").replace(":", "") + "-" +
      "git rev-parse --short HEAD".execute()!!.trim()

  fun npmVersion(url: String): String? {
    try {
      val client = OkHttpClient()
      val request = Request.Builder().url(url).build()
      val response = client.newCall(request).execute()
      val responseUrl = response.request().url().toString()
      return responseUrl.split("@").last().dropLast(1)
    } catch (ignored: java.io.IOException) {
      println("Failed to fetch ${ignored.message}")
      return null
    } catch (error: Throwable) {
      println("Response failure ${error.message}")
      return null
    }
  }

  override fun apply(project: Project) {
    project.run {
      val npmVersion = npmVersion("https://unpkg.com/@misk/core/") ?: ""
      project.version = versionName()
    }
  }
}
