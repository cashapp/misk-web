import * as fs from "fs-extra"
import { Files, JsonOptions } from "../utils"
import { createPackage, createTsconfig, gitignore, tslint } from "./templates"

export const generateBuildFiles = async () => {
  const pkg = await fs.readJson(Files.package)
  const miskTab = await fs.readJson(Files.miskTab)
  fs.writeFile(Files.gitignore, gitignore)
  fs.writeJson(Files.package, createPackage(miskTab.slug, pkg), JsonOptions)
  fs.writeJson(Files.tsconfig, createTsconfig(miskTab.outDir), JsonOptions)
  fs.writeJson(Files.tslint, tslint, JsonOptions)
}
