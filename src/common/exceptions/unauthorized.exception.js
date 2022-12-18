import { HttpException } from "./http.exception.js"

export class UnauthorizedException extends HttpException {
  constructor(
    message = "Une authentification est nécessaire pour accéder à la ressource.",
    status = 401,
    name = "Unauthorized"
  ) {
    super(message, status, name)
  }
}
