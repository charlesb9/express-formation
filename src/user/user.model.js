import { model, Schema } from "mongoose"
import { isEmail } from "../common/validators/email.validator.js"

/**
 * Class User
 * @typedef {object} User
 * @property {string} email.required - email
 * @property {string} password.required - password
 */
const schema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [isEmail],
  },
  password: { 
    type: String 
  },
}, { timestamps: true })

export const User = model("User", schema)
