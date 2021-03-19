import { SIMPLEREDUX } from "src/action"
import { dispatchDefault, dispatchSimpleRedux } from "src/dispatch"
import { IAction, mergeSagaMapKeysToTags } from "src/utilities"

describe("mergeSaga", () => {
  it("mergeSagaMapKeysToTags", () => {
    const action: IAction<SIMPLEREDUX, any> = {
      payload: {
        ...dispatchDefault,
        data: {
          data: {
            alpha: "alpha PingRequest{message=test}",
            bravo: "bravo",
            charlie: "charlie",
            delta: "delta",
            echo: "echo",
            foxtrot: "foxtrot",
            gary: "gary",
          },
        },
      },
      type: SIMPLEREDUX.MERGE,
    }
    expect(action).toBeDefined()
    const tag = "tag"
    const keyTagLookup: { [key: string]: string } = {
      alpha: `${tag}::alpha`,
      bravo: `${tag}::bravo`,
      charlie: `${tag}::charlie`,
      delta: `${tag}::delta`,
      echo: `${tag}::echo`,
      foxtrot: `${tag}::foxtrot`,
      gary: `${tag}::gary`,
    }
    const payloadPath = "data.data"
    const saga = mergeSagaMapKeysToTags(
      dispatchSimpleRedux,
      payloadPath,
      keyTagLookup
    )
    expect(saga).toBeDefined()
    // TODO add in further functionality tests to prove that it does and emits expected actions https://redux-saga.js.org/docs/advanced/Testing.html
  })
})
