import mongoose from 'mongoose'

export const mongoIsConnectedHelper = () => {
  if (mongoose.connection.readyState !== 1) throw 'Database connexion failed'
}

export const userTest = { email: 'test@test.com', password: 'test' }
