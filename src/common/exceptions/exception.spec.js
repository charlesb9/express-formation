import { describe, it, expect } from "@jest/globals"
import { ConflictException } from "./conflict.exception.js"
import { HttpException } from "./http.exception.js"
import { NotFoundException } from "./not-found.exception.js"
import { UnauthorizedException } from "./unauthorized.exception.js"

describe("Test instance HttpException", () => {
  it("should be extend error", () => {
    const exception = new HttpException()
    expect(exception).toBeInstanceOf(Error)

    expect(exception.status).toBe(500)
    expect(exception.name).toBe("Server Error")
    expect(exception.message).toBe("Erreur interne du serveur.")
  })
})

describe("Not Found Exception instance", () => {
  it("should be extend error and http error", () => {
    const exception = new NotFoundException()
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception).toBeInstanceOf(Error)

    expect(exception.status).toBe(404)
    expect(exception.name).toBe("Not Found")
    expect(exception.message).toBe("Ressource non trouvée.")
  })
})

describe("Unauthorized Excepetion instance", () => {
  it("should be extend error and http error", () => {
    const exception = new UnauthorizedException()
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception).toBeInstanceOf(Error)

    expect(exception.status).toBe(401)
    expect(exception.name).toBe("Unauthorized")
    expect(exception.message).toBe(
      "Une authentification est nécessaire pour accéder à la ressource."
    )
  })
})

describe("Conflict Excepetion instance", () => {
  it("should be extend error and http error", () => {
    const exception = new ConflictException()
    expect(exception).toBeInstanceOf(HttpException)
    expect(exception).toBeInstanceOf(Error)

    expect(exception.status).toBe(409)
    expect(exception.name).toBe("Conflict")
    expect(exception.message).toBe(
      "La requête ne peut être traitée à la suite d'un conflit avec l'état actuel du serveur."
    )
  })
})
