import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { secretKey } from '../config'
import { Player } from '../models/interfaces'

export function verifyToken(req: Request, res: Response, next: any) {
	if (!req.headers.authorization || !req.headers.authorization.split(' ')[1]) {
		return res.status(403).json('no token provided')
	}
	const token = req.headers.authorization.split(' ')[1]
	verify(token, secretKey, (err, decoded) => {
		if (err) {
			return res.status(500).json('Failed to authenticate token')
		} else {
		}
	})
	next()
}
