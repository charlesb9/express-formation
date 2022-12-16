import request from 'supertest'
import { app } from '../server.js'
import { expect, it, describe, test, beforeEach } from '@jest/globals'
import { mongoIsConnectedHelper, userTest } from '../test.helper.js'

describe('test api post router', () => {
  let token = ''

  beforeEach(async () => {
    const res = await request(app).post('/api/auth/login').send(userTest)
    token = res.body
  })

  test('Login test user before run test post', async () => {
    const res = await request(app).post('/api/auth/login').send(userTest)
    expect(res.statusCode).toEqual(200)
  })

  it('GET /api/post should response is array', async () => {
    mongoIsConnectedHelper()
    const res = await request(app).get('/api/post')
    await expect(res.statusCode).toEqual(200)
    await expect(res.body).toBeInstanceOf(Array)
  })

  it('POST /api/posts should return a post', async () => {
    mongoIsConnectedHelper()
    const responseModelObject = {
      message: 'Unauthorized, you are not logged in',
    }
    const resInitPostList = await request(app).get('/api/post')
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post('/api/post')
      .send({ title: 'test', content: 'my content' })

    await expect(res.statusCode).toEqual(401)
    await expect(res.body).toMatchObject(responseModelObject)

    const resCountAfterPost = await request(app).get('/api/post')
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount).toBeTruthy()
  })

  it('POST /api/posts should be a 401 error', async () => {
    mongoIsConnectedHelper()
    const responseModelObject = {
      message: 'Unauthorized, you are not logged in',
    }
    const resInitPostList = await request(app).get('/api/post')
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post('/api/post')
      .send({ title: 'test', content: 'my content' })

    await expect(res.statusCode).toEqual(401)
    await expect(res.body).toMatchObject(responseModelObject)

    const resCountAfterPost = await request(app).get('/api/post')
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount).toBeTruthy()
  })

  it('POST /api/posts should be a 201 success', async () => {
    mongoIsConnectedHelper()
    const post = { title: 'test', content: 'my content' }
    const resInitPostList = await request(app).get('/api/post')
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(post)

    await expect(res.statusCode).toEqual(201)
    await expect(res.body).toMatchObject(post)

    const resCountAfterPost = await request(app).get('/api/post')
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount + 1).toBeTruthy()
  })
})
