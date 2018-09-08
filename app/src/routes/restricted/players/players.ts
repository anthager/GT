import { Router, Request, Response } from 'express'
import * as db from '../../../services/databaseService'
import { Player, Opponent } from '../../../models/interfaces'
import { logger } from '../../../utils/logger'

export const router = Router()

router.get('/all', async (req: Request, res: Response) => {
	const players = await getAllPlayers(req.player).catch(err => {
		logger.log({ level: 'info', message: `failed to fetch players for ${req.player}, err: ${err}` })
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(players)
})

router.get('/opponents', async (req: Request, res: Response) => {
	const opponents = await getAllOpponents(req.player).catch(err => {
		logger.log({
			level: 'info',
			message: `failed to fetch opponents for ${req.player}, err: ${err}`,
		})
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(opponents)
})

router.get('/total', async (req: Request, res: Response) => {
	const total = await getTotal(req.player).catch(err => {
		logger.log({
			level: 'info',
			message: `failed to fetch total amount for ${req.player}, err: ${err}`,
		})
		res.status(500).json('an error has occurred')
	})
	res.status(200).json(total)
})

export async function getAllPlayers(player: Player): Promise<Player[]> {
	logger.log({ level: 'info', message: `all players fetched by ${player.name}` })
	return db.getAllPlayersExcept(player)
}

export async function getAllOpponents(player: Player): Promise<Opponent[]> {
	logger.log({ level: 'info', message: `all opponents fetched by ${player.name}` })
	return db.getAllOpponents(player)
}

export async function getTotal(player: Player): Promise<number> {
	logger.log({ level: 'info', message: `all total amount fetched by ${player.name}` })
	return db.getTotalSum(player)
}
