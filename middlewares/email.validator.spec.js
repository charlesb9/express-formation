import { expect, it, describe } from '@jest/globals'
import { isEmail } from './email.validator.js'

describe('Test validation email', () => {
  it('should be false if parse \'test\' string', async () => {
    const test = isEmail('test')
    expect(test).toBeFalsy()
  })

  it('should be true if parse \'test@test.com\' string', async () => {
    const test = isEmail('test@test.com')
    expect(test).toBeTruthy()
  })

  it('should be fasle if parse \'test@test\' string', async () => {
    const test = isEmail('test@test')
    expect(test).toBeFalsy()
  })
})
