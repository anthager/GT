import { Player } from './interfaces'
import { Request } from 'express'

declare global {
	namespace Express {
		export interface Request {
			player: Player
		}
	}
}
