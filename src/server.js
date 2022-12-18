import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { routerApi } from "./routers/api.router.js"
import config from "./common/config/config.js"
import { swaggerOptions } from "./swagger-options.js"
import expressJsDocSwagger from "express-jsdoc-swagger"
import morgan from "morgan"
import { HttpException } from "./common/exceptions/http.exception.js"

try {
  mongoose.set("strictQuery", true)
  await mongoose.connect(
    `mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}`,
    { dbName: config.db.database }
  )
} catch (err) {
  console.log(err)
}

const app = express()

if (config.environment !== "test") {
  const logger = morgan("tiny")
  morgan(":method :url :status :res[content-length] - :response-time ms")
  app.use(logger)
}

app.use(express.json())

app.use(
  cors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
)

expressJsDocSwagger(app)(swaggerOptions)

app.use("/api", routerApi)

app.use((err, req, res, next) => {
  if (!(err instanceof HttpException)) err = new HttpException()
  if (err) res.status(err.status).json({ error: err.message })
  next()
})

if (config.environment !== "test") {
  app.listen(parseInt(config.port), console.log("listen " + config.port))
}

export { app, mongoose }
