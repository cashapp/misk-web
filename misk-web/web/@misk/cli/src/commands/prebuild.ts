import { migrate, packageMiskTabExists } from "../utils"

export const command = "prebuild"
export const desc = `consume miskTab.json and write necessary build files`

export async function handler() {
  console.log("prebuild")
  console.log("pb", await packageMiskTabExists())
  if (await packageMiskTabExists()) {
    console.log("wat")
    migrate()
  }
}
