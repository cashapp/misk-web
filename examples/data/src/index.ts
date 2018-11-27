// tslint:disable-next-line:no-var-requires
const writeJson = require("write-json")
import * as data from "./data"

const output = "./demo"

Object.entries(data).map(([key, set]) =>
  writeJson(`${output}/${key}.json`, set, (err: any) =>
    console.log(`[misk-web-examples-demo] Failed to write: ${key}.\n${err}`)
  )
)
