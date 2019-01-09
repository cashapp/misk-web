import * as fs from "fs-extra"
import * as data from "./data"

const output = "./demo"
const JsonOptions = { spaces: 2 }

Object.entries(data).map(([key, jsonDataSet]) => {
  const file = `${output}/${key}.json`
  fs.writeJson(file, jsonDataSet, JsonOptions)
    .then(() => {
      console.log(`[misk-web-examples-demo] [success] ${file}`)
    })
    .catch((error: any) =>
      console.log(`[misk-web-examples-demo] [error] ${file}.\n${error}`)
    )
})
