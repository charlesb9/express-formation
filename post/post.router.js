import { Router } from 'express'
import { createPost, getPosts, getSinglePost, removePost, updatePost } from './post.controller.js'

const router = Router()

/**
 * GET /api/post
 * @summary Get All Post
 * @tags Post
 * @return { object } 200 - success response
 */
router.get('/', getPosts)

/**
 * POST /api/post
 * @summary Create Post
 * @tags Post
 * @param { Post } request.body.required
 * @return { object } 201 - succes reponse
 */
router.post('/', createPost)

/**
 * GET /api/post/{id}
 * @summary Get one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @return { object } 200 - success response
 */
router.get('/:id', getSinglePost )

/**
 * PUT /api/post/{id}
 * @summary Update one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @param { Post } request.body.required - Post
 * @return { object } 201 - success response
 */
router.put('/:id', updatePost)

/**
 * DELETE /api/post/{id}
 * @summary Delete One Post
 * @param { string } id.path.required - id of Post
 * @tags Post
 */
router.delete('/:id', removePost)

export {
	router as routerPost
}