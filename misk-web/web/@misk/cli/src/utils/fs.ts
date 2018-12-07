// tslint:disable-next-line:no-var-requires
const jsonfile = require("jsonfile")

export const readFile = async (filename: string) => {
  return jsonfile
    .readFile(filename)
    .then((pkg: any) => {
      return pkg
    })
    .catch((error: any) => {
      if (error.code == "ENOENT") {
        return false
      } else {
        throw error
      }
    })
}

export const writeFile = async (filename: string, object: object) => {
  return jsonfile.writeFile(filename, object).catch((error: any) => {
    throw error
  })
}
