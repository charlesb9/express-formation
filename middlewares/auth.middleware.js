import jwt from 'jsonwebtoken'
import config from '../config.js'

export const auth = (req, res, next) => {
  try {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1]
      jwt.verify(token, config.secret)
      next()
    } else {
      throw new Error('Unauthorized, you are not logged in')
    }
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}
