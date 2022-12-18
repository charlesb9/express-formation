import jwt from "jsonwebtoken"
import config from "../common/config/config.js"
import { UnauthorizedException } from "../common/exceptions/index.js"

export const auth = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) throw new UnauthorizedException()
    const token = req.headers["authorization"].split(" ")[1]
    if (!jwt.verify(token, config.secret)) throw new UnauthorizedException()
    next()
  } catch (err) {
    throw new UnauthorizedException()
  }
}
