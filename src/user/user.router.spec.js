import request from "supertest"
import { app } from "../server.js"
import { expect, it, describe, beforeEach } from "@jest/globals"
import { setupBeforeAndAfter } from "../../test/setup.js"
import { mongoIsConnectedHelper } from "../../test/helpers.js"

const path = "/api/auth/"

describe("POST " + path, () => {
  let res

  setupBeforeAndAfter()

  beforeEach(async () => {
    mongoIsConnectedHelper()
  })

  it("should ne a 204 create user on register", async () => {
    res = await request(app)
      .post(path + "register")
      .send({email : "register@test.com", password : "123456789LMPO"})
    expect(res.statusCode).toEqual(204)
  })

  it("should be a 409 user email used", async () => {
    res = await request(app)
      .post(path + "register")
      .send({email : "register@test.com", password : "123456789LMPO"})
    expect(res.statusCode).toEqual(409)
    expect(res.body.error).toEqual("Ce compte existe déjà.")
  })

  it("should be a 201 and send a token on login", async () => {
    res = await request(app)
      .post(path + "login")
      .send({email : "register@test.com", password : "123456789LMPO"})
    expect(res.statusCode).toEqual(201)
    expect(typeof res.body == 'string').toBeTruthy()
  })

  it("should be a 404 if user not exist", async () => {
    res = await request(app)
      .post(path + "login")
      .send({email : "register@tst.com", password : "123456789LMPO"})
    expect(res.statusCode).toEqual(404)
    expect(res.body.error).toEqual("L'utilisateur n'existe pas")
  })

  it("should be a 401 if password invalid", async () => {
    res = await request(app)
      .post(path + "login")
      .send({email : "register@test.com", password : "12345678"})
    expect(res.statusCode).toEqual(401)
    expect(res.body.error).toEqual("Mot de passe invalide")
  })
})
