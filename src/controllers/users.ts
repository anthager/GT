import { UserModel, User } from '../models/user'
import { Request, Response } from 'express'
import validator from 'validator'
import logger from '../utils/logger'
import { info } from 'winston'

export const add = (req: Request, res: Response) => {
	const unsafeUser = validateUserBody(req.body)
	if (!unsafeUser) {
		res.status(400).send()
	}
	User.create(unsafeUser)
		.then((user) => {
			logger.log({
				level: 'info',
				message: `added ${user} to db`,
			})
			res.status(200).json(user)
		})
		.catch((err) => {
			let errMessage: string = ''
			let code: number = 400
			if (err.code) {
				code = 409
				errMessage = `tried adding user to db but there is alreaddy one with the same email or name`
			}
			logger.log({
				level: 'info',
				message: errMessage,
			})
			res.status(code).send()
		})
}

const validateUserBody = (body: any): UserModel | undefined => {
	const user: UserModel | undefined = body as UserModel
	if (user.email && user.name && validator.isEmail(user.email)) {
		return user
	}
	return undefined
}
