import mongoose from "mongoose"
import { Post } from "../src/post/post.model.js"
import { User } from "../src/user/user.model.js"

export const mongoIsConnectedHelper = () => {
  if (mongoose.connection.readyState !== 1) throw "Database connexion failed"
}

export const userTest = { email: "test@test.com", password: "88FZEDOVKjkvcqs8C1" }
export const unauthorizedMessage = { error: "Une authentification est nécessaire pour accéder à la ressource."}

export const cleanUpDatabase = async () => {
  await Post.remove({})
  await User.remove({})
}
