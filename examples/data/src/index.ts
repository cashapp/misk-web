// tslint:disable-next-line:no-var-requires
const writeJson = require("write-json")
import * as data from "./data"

const output = "./demo"

Object.entries(data).map(([key, set]) => {
  const file = `${output}/${key}.json`
  writeJson(file, set, (err: any) => {
    if (err) {
      console.log(`[misk-web-examples-demo] [error] ${file}.\n${err}`)
    } else {
      console.log(`[misk-web-examples-demo] [success] ${file}`)
    }
  })
})
