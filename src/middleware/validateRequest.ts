import { Request, Response } from 'express'
import { checkSchema, validationResult } from 'express-validator/check'
import { Player } from '../models/interfaces'
import { RequestHandlerParams } from '../../node_modules/@types/express-serve-static-core';

export const validateRegisterInput: RequestHandlerParams[] = [
	checkSchema({
		name: {
			in: ['body'],
			errorMessage: 'missing name',
			isString: true,
			rtrim: {
				options: [[' ', '-']],
			},
			isLength: {
				errorMessage: 'Name should be at least 7 chars long',
				options: { min: 4 },
			},
		},
		password: {
			in: ['body'],
			errorMessage: 'missing password',
			isString: true,
			isLength: {
				errorMessage: 'Password should be at least 7 chars long',
				options: { min: 7 },
			},
		},
	}),
	(req: Request, res: Response, next: any) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		req.player = { name: req.body.name, password: req.body.password, uid: -1 }
		next()
	},
]
