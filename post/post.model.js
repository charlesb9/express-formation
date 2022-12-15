import { model, Schema } from "mongoose";

const schema = new Schema({
	title: { type: String},
	content: { type: String}
}, { timestamps : true })

export const Post = model('Post', schema)