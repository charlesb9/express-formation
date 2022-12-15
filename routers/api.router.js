import { Router } from 'express'
import { routerPost } from '../post/post.router.js'

const router = Router()

router.use('/post', routerPost)

export { router as routerApi }