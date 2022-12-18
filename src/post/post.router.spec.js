import request from "supertest"
import { app } from "../server.js"
import {
  expect,
  it,
  describe,
  beforeEach,
  beforeAll,
  afterEach,
} from "@jest/globals"
import { setupBeforeAndAfter } from "../../test/setup.js"
import { unauthorizedMessage, userTest } from "../../test/helpers.js"
import { mongoIsConnectedHelper } from "../../test/helpers.js"

const path = "/api/post/"

describe("GET " + path, () => {
  setupBeforeAndAfter()

  let res

  it("should be a array", async () => {
    res = await request(app).get(path)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toBeInstanceOf(Array)
  })

  it("should be a same post if get single post by id after publish", async () => {
    let post = { title: "test", content: "contenu du post" }

    res = await request(app).post("/api/auth/login").send(userTest)
    const token = res.body

    res = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send(post)
    const { _id } = res.body

    res = await request(app).get(path + _id)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toMatchObject(post)
  })
})

describe("POST " + path, () => {
  setupBeforeAndAfter()

  let token = ""

  beforeEach(async () => {
    mongoIsConnectedHelper()
    const res = await request(app).post("/api/auth/login").send(userTest)
    token = res.body
  })

  it("should return a post", async () => {
    const resInitPostList = await request(app).get(path)
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post(path)
      .send({ title: "test", content: "my content" })
    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject(unauthorizedMessage)

    const resCountAfterPost = await request(app).get("/api/post")
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount).toBeTruthy()
  })

  it("should be a 401 error", async () => {
    const resInitPostList = await request(app).get("/api/post")
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post(path)
      .send({ title: "test", content: "my content" })

    expect(res.statusCode).toEqual(401)
    expect(res.body).toMatchObject(unauthorizedMessage)

    const resCountAfterPost = await request(app).get(path)
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount).toBeTruthy()
  })

  it("should be a 201 success", async () => {
    const post = { title: "test", content: "my content" }
    const resInitPostList = await request(app).get(path)
    const initPostCount = resInitPostList.body.length

    const res = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send(post)

    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject(post)

    const resCountAfterPost = await request(app).get(path)
    const countAfterPost = resCountAfterPost.body.length
    expect(countAfterPost === initPostCount + 1).toBeTruthy()
  })
})

describe("DELETE" + path, () => {
  let res
  let _id
  let postCount = 0
  let token = ""

  beforeAll(async () => {
    res = await request(app).post("/api/auth/login").send(userTest)
    token = res.body
    res = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "test", content: "post à supprimer" })
    _id = res.body._id

    res = await request(app).get(path)
    postCount = res.body.length
  })

  beforeEach(() => {
    mongoIsConnectedHelper()
  })

  afterEach(async () => {
    res = await request(app).get(path)
    expect(postCount === res.body.length).toBeTruthy()
  })

  it("should be a 401 if user not authentified", async () => {
    res = await request(app).delete(path + _id)

    expect(res.statusCode).toEqual(401)
  })

  it("should be 204 if user authentified and use a valid id", async () => {
    res = await request(app)
      .delete(path + _id)
      .set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toEqual(204)
    postCount--
  })

  it("should be 404 if secondary delete same post", async () => {
    res = await request(app)
      .delete(path + _id)
      .set("Authorization", `Bearer ${token}`)

    expect(res.statusCode).toEqual(404)
  })
})

describe("PUT " + path, () => {
  let res
  let token = ""
  let _id
  beforeAll(async () => {
    res = await request(app).post("/api/auth/login").send(userTest)
    token = res.body
    res = await request(app)
      .post(path)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "test de put", content: "post à modifier" })
    _id = res.body._id
  })

  beforeEach(async () => {
    mongoIsConnectedHelper()
  })

  it("should be 401 if user not authentified and post not modified", async () => {
    const value = { title: "modification", content: "modifié" }
    res = await request(app)
      .put(path + _id)
      .send(value)
    expect(res.statusCode).toEqual(401)
    res = await request(app).get(path + _id)
    expect(res.body).not.toMatchObject(value)
  })

  it("should match a object", async () => {
    const value = { title: "modification", content: "modifié" }
    res = await request(app)
      .put(path + _id)
      .set("Authorization", `Bearer ${token}`)
      .send(value)
    expect(res.statusCode).toEqual(200)
    res = await request(app).get(path + _id)
    expect(res.body).toMatchObject(value)
  })
})
