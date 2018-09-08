import { Request, Response, NextFunction } from 'express'
import { checkSchema, validationResult, ValidationParamSchema } from 'express-validator/check'
import { Player } from '../models/interfaces'
import { RequestHandlerParams } from '../../node_modules/@types/express-serve-static-core'
import { Location } from '../../node_modules/express-validator/check/location'

const authSchema: Record<string, ValidationParamSchema> = {
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
	checkSchema(authSchema),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		req.player = { name: req.body.name, password: req.body.password, id: -1 }
		next()
	},
]

export const validateLoginInput: RequestHandlerParams[] = [
	checkSchema(authSchema),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		req.player = { name: req.body.name, password: req.body.password, id: -1 }
		next()
	},
]

const playerAndOpponentSchema: ValidationParamSchema = {
	in: ['body'],
	exists: true,
	custom: {
		options: (p: Player, { req, location, path }) => {
			return (
				p.name &&
				typeof p.name === 'string' &&
				p.name.length &&
				p.password &&
				typeof p.password === 'string' &&
				p.password.length
			)
		},
	},
}

export const validatePostBody: RequestHandlerParams[] = [
	checkSchema({
		opponent: {
			in: ['body'],
			exists: true,
			custom: {
				options: (p: Player, { req, location, path }) => {
					return p.name && typeof p.name === 'string' && p.name.length
				},
			},
			errorMessage: 'invalid player',
		},
		amount: {
			in: ['body'],
			exists: true,
			isInt: true,
			isNumeric: true,
			errorMessage: 'invalid amount',
			custom: {
				options: (amount: number, { req, location, path }) => {
					return amount > 0
				},
			},
		},
	}),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}
		next()
	},
]
