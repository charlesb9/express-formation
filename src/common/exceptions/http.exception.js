export class HttpException extends Error {
  constructor(
    message = "Erreur interne du serveur.",
    status = 500,
    name = "Server Error"
  ) {
    super(message)
    this.status = status
    this.name = name
    this.message = message
  }
}
