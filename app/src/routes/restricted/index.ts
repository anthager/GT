import { Router, Request, Response } from 'express'
import * as players from './players'
import * as games from './games'

export const router = Router()

router.use('/players', players.router)
router.use('/games', games.router)

router.get('/', (req: Request, res: Response) => {
	res.status(200).json('nice')
})
