import { SIMPLEREDUX } from 'src/action'
import { createAction } from "src/utilities"

describe("createAction", () => {
  it("creates an action", () => {
    interface IPayload {
      data: number
    }
    const expectedAction = {
      type: SIMPLEREDUX.MERGE,
      payload: {
        data: 1234
      }
    }
    expect(createAction<SIMPLEREDUX, IPayload>(SIMPLEREDUX.MERGE, { data: 1234 })).toEqual(expectedAction)
  })
})
