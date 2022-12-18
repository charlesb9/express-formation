import { HttpException } from "./http.exception.js"

export class ConflictException extends HttpException {
  constructor(
    message = "La requête ne peut être traitée à la suite d'un conflit avec l'état actuel du serveur.",
    status = 409,
    name = "Conflict"
  ) {
    super(message, status, name)
  }
}
