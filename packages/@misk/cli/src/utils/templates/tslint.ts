import { IMiskTabJSON } from ".."

export const tslint = (miskTab: IMiskTabJSON) => ({
  extends: "@misk/tslint",
  ...miskTab.rawTslint
})
