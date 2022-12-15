import express from 'express'
import cors from "cors"
import mongoose from 'mongoose'
import { routerApi } from './routers/api.router.js'
import config from './config.js'
import { swaggerOptions } from './swagger-options.js'
import expressJsDocSwagger from 'express-jsdoc-swagger'

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/?retryWrites=true&w=majority`)
				.then(() => console.log('connexion à mongo réussie'))
				.catch(err => console.log(err))

const app = express()

app.use(express.json())

app.use(cors({
	"origin": '*',
	"methods": "GET, PUT, POST, DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 200,
}))

expressJsDocSwagger(app)(swaggerOptions)

app.use('/api',  routerApi)

app.listen(parseInt(config.port), console.log('listen ' + config.port))