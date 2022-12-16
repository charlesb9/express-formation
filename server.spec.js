import { app, mongoose } from './server.js'
import { expect, it, describe } from '@jest/globals'

describe('state app', () => {
  it('should be true', () => {
    expect(mongoose).toBeTruthy()
    expect(app).toBeTruthy()
  })
})
