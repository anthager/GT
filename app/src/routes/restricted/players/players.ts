import { Router, Request, Response } from 'express'
import * as db from '../../../services/databaseService'
import { Player } from '../../../models/interfaces'
import { logger } from '../../../utils/logger'

export const router = Router()

router.get('/', async (req: Request, res: Response) => {
	const players = await getAllPlayers(req.player).catch(err => {
		logger.log({ level: 'info', message: `failed to fetch players for ${req.player}, err: ${err}` })
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(players)
})

router.get('/debts', async (req: Request, res: Response) => {
	const players = await getAllPlayers(req.player).catch(err => {
		logger.log({ level: 'info', message: `failed to fetch players for ${req.player}, err: ${err}` })
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(players)
})

export async function getAllPlayers(player: Player): Promise<Player[]> {
	logger.log({ level: 'info', message: `all players fetched by ${player.name}` })
	return db.getAllPlayersExcept(player)
}

export async function getDebts(player: Player): Promise<Player[]> {
	logger.log({ level: 'info', message: `all players fetched by ${player.name}` })
	return db.getAllPlayersExcept(player)
}
