import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { routerApi } from './routers/api.router.js'
import config from './config.js'
import { swaggerOptions } from './swagger-options.js'
import expressJsDocSwagger from 'express-jsdoc-swagger'
import morgan from 'morgan'

try {
  mongoose.set('strictQuery', true)
  await mongoose.connect(
    `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/?retryWrites=true&w=majority`
  )
  console.log('database connected')
} catch (err) {
  console.log(err.message)
}

const app = express()


if (config.environment !== 'test') {
  const logger = morgan('tiny')
  morgan(':method :url :status :res[content-length] - :response-time ms')
  app.use(logger)
}



app.use(express.json())

app.use(
  cors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
)

expressJsDocSwagger(app)(swaggerOptions)

app.use('/api', routerApi)

if (config.environment !== 'test') {
  app.listen(parseInt(config.port), console.log('listen ' + config.port))
}

export { app, mongoose }
