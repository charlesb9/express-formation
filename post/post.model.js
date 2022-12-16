import { model, Schema } from 'mongoose';

/**
 * Class Post
 * @typedef {object} Post
 * @property {string} title.required - post title
 * @property {string} content - content post
 */
const schema = new Schema(
  {
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

export const Post = model('Post', schema);
