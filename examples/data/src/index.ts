// tslint:disable-next-line:no-var-requires
const jsonfile = require("jsonfile")
import * as data from "./data"

const output = "./demo"

Object.entries(data).map(([key, jsonDataSet]) => {
  const file = `${output}/${key}.json`
  jsonfile
    .writeFile(file, jsonDataSet)
    .then(() => {
      console.log(`[misk-web-examples-demo] [success] ${file}`)
    })
    .catch((error: any) =>
      console.log(`[misk-web-examples-demo] [error] ${file}.\n${error}`)
    )
})
