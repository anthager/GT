import { Router, Request, Response } from 'express'
import { Player } from '../../models/interfaces'
import * as db from '../../services/databaseService'
import { logger } from '../../utils/logger'

export const router = Router()

router.get('/', (req: Request, res: Response) => {
	res.status(200).json('nice')
})
router.get('/players', async (req: Request, res: Response) => {
	const players = await getAllPlayers(req.player).catch(err => {
		console.log(req.player)
		console.log(err)
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(players)
})

export async function getAllPlayers(player: Player): Promise<Player[]> {
	logger.log({ level: 'info', message: `all players fetched by ${player.name}` })
	return db.getAllPlayersExcept(player.id)
}
