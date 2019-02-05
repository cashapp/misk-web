import * as fs from "fs-extra"
import * as data from "./data"

const output = "./demo"
fs.ensureDir(output)
const JsonOptions = {
  // spaces: 2 // not pretty output because files become bigger for large JSON >1000 records
}

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
