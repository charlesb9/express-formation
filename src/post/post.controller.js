import { NotFoundException } from "../common/exceptions/index.js"
import { Post } from "./post.model.js"

const getAll = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await Post.findOne({ _id: id })
    if (!post) throw new NotFoundException()
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  const { body } = req
  try {
    const post = await Post.create(body)
    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

const update = async (req, res, next) => {
  try {
    const {
      body: data,
      params: { id },
    } = req
    const post = await Post.findOneAndUpdate({ _id: id }, data, {
      returnOriginal: false,
    })
    if (!post) throw new NotFoundException()
    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    let deleteResponse = await Post.remove({ _id: id })
    if (!deleteResponse.deletedCount) throw new NotFoundException()
    res.status(204).json()
  } catch (err) {
    next(err)
  }
}

export {
  getAll as getPosts,
  getSingle as getSinglePost,
  create as createPost,
  update as updatePost,
  remove as removePost,
}
