import { readFileSync } from 'fs'
import { join } from 'path'

describe('Dist bundle', () => {
  it('simpleredux.js is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/simpleredux.js'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('simpleForm.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/simpleForm.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('simpleNetwork.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/simpleNetwork.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
  it('utilities.d.ts is unchanged', () => {
    const file = readFileSync(join(__dirname, '..', 'lib/web/@misk/simpleredux/src/utilities.d.ts'), 'utf8')
    expect(file).toMatchSnapshot()
  })
})
