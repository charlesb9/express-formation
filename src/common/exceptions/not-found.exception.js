import { HttpException } from "./http.exception.js"

export class NotFoundException extends HttpException {
  constructor(
    message = "Ressource non trouvée.",
    status = 404,
    name = "Not Found"
  ) {
    super(message, status, name)
  }
}
