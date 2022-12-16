import request from 'supertest'
import { app, mongoose } from './server.js'
import { expect } from '@jest/globals';

describe('Mongo DB', () => {
	it('shoudl be true', () => {
		expect(mongoose).toBeTruthy()
		expect(app).toBeTruthy()
	})
})