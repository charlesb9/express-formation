import express from 'express'
import mongoose from 'mongoose'
import { routerApi } from './routers/api.router.js'
import config from './config.js'
import { swaggerOptions } from './swagger-options.js'
import expressJsDocSwagger from 'express-jsdoc-swagger'
console.log(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/?retryWrites=true&w=majority`)
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/?retryWrites=true&w=majority`)
				.then(() => console.log('connexion à mongo réussie'))
				.catch(err => console.log(err))

const app = express()

/**
 * POST /api/post
 * @summary Create Post
 * @tags Post
 * @param { Post } request.body.required
 * @return { object } 201 - succes reponse
 */

expressJsDocSwagger(app)(swaggerOptions)

app.use('/api',  routerApi)

app.listen(parseInt(config.port), console.log('listen ' + config.port))