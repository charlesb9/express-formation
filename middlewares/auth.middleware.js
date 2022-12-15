import jwt from 'jsonwebtoken'
import config from '../config.js'

export const auth = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    jwt.verify(token, config.secret)
    next()
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}
