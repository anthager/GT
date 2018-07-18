import mongoose from 'mongoose'

export type UserModel = {
	name: string
	email: string
}

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true, index: true },
		removed: { type: Boolean },
	},
	{
		timestamps: true,
	},
)

export const User = mongoose.model('user', schema)
