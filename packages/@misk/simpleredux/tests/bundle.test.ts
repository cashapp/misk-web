import { readFileSync } from 'fs'
import { join } from 'path'

describe('Dist bundle', () => {
  it('action.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/action.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('dispatch.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/dispatch.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('reducer.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/reducer.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('saga.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/saga.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('utilities.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/utilities.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
})
