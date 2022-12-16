import { User } from "./user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../common/config/config.js"
import { isEmail } from "../common/validators/email.validator.js"
import { ConflictException, HttpException, UnauthorizedException, NotFoundException } from "../common/exceptions"

export const login = async (req, res, next) => {
  try {
    const { body } = req
    const user = await User.findOne({ email: body.email })
    if (!user) throw new NotFoundException("L'utilisateur n'existe pas")
    if (!config.secret) throw new HttpException()
    if (!await bcrypt.compare(body.password, user.password)) throw new UnauthorizedException("Mot de passe invalide")

    const token = await jwt.sign({ 
      userId: user.id }, 
      config.secret, {
          expiresIn: "24h",
      })
    res.status(201).json(token)

  } catch (err) {
    next(err)
  }
}

export const register = async (req, res, next) => {
  try {
    const { body } = req

    if (!isEmail(body.email)) throw new UnauthorizedException("Format email invalide")
	  if (await User.findOne({email : body.email})) throw new ConflictException("Ce compte existe déjà.")

    const password = await bcrypt.hash(body.password, 10)
    const userData = {...body, password}
    await User.create(userData)
    res.status(204).json()

  } catch (err) {
    next(err)
  }
}
