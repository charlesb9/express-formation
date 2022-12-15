import { Router } from 'express'
import { createPost, getPosts, getSinglePost } from './post.controller.js'

const router = Router()

router.get('/', getPosts)

router.post('/', createPost)

router.get('/:id', getSinglePost )

router.put('/:id', (req, res) => {
	const { id } = req.params
	res.send('route pour récuperer le post ' + id )
})

router.delete('/:id', (req, res) => {
	res.send('route pour suppreimer un post')
})

export {
	router as routerPost
}