import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult, ValidationParamSchema } from 'express-validator/check'
import { Player } from '../models/interfaces'
import { RequestHandlerParams } from '../../node_modules/@types/express-serve-static-core'
import { Location } from '../../node_modules/express-validator/check/location'

const schema: Record<string, ValidationParamSchema> = {
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
}

export const validateRegisterInput: RequestHandlerParams[] = [
	checkSchema(schema),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		req.player = { name: req.body.name, password: req.body.password, uid: -1 }
		next()
	},
]

export const validateLoginInput: RequestHandlerParams[] = [
	checkSchema(schema),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		req.player = { name: req.body.name, password: req.body.password, uid: -1 }
		next()
	},
]
