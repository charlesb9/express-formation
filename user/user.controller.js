import { User } from "./user.model.js"

export const login = async (req, res) => {
	try {
		const  { body } = req
		const user = await User.findOne({email: body.email})
		res.status(200).json(user)
	} catch(err) {
		res.status(404).json({message : err.message})
	}
}

export const register = async (req, res) => {
	try {
		const { body } = req
		await User.create(body)
		res.status(201).json({message: 'utilisateur créé'})
	} catch(err) {
		res.status(400).json({message : err.message})
	}
}