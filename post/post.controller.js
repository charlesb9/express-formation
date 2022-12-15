import { Post } from "./post.model.js"

const getAll = async (req, res) => {
	try {
		const posts = await Post.find()
		res.status(200).json(posts)
	} catch(err) {
		res.status(400).json({ message: err.message })
	}
}

const getSingle = async (req, res) => {
	try {
		const { id } = req.params
		console.log(id)
		const post = await Post.findOne({_id : id})
		res.status(200).json(post)
	} catch (err) {
		res.status(404).json({ message: err.message })
	}
}

const create = async (req, res) => {
	const { body } = req
	try {
		const post = await Post.create(body)
		res.status(201).json(post)
	} catch(err) {
		res.status(400).json({ message : err.message})
	}
}

const update = async (req, res) => {

}

const remove = async (req, res) => {

}



export {
	getAll as getPosts,
	getSingle as getSinglePost,
	create as createPost
}