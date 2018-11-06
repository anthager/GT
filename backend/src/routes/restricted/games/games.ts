import { Router, Request, Response } from 'express'
import * as db from '../../../services/databaseService'
import { Player } from '../../../models/interfaces'
import { logger } from '../../../utils/logger'
import { validatePostBody } from '../../../middleware/validateRequest'

export const router = Router()

router.post('/new', ...validatePostBody, async (req: Request, res: Response) => {
	try {
		await addGame(req.player, req.body.opponent, req.body.amount)
	} catch (err) {
		logger.log({
			level: 'warn',
			message: `a post between ${req.player.name} tried to add game with ${
				req.body.opponent.name
			} for ${req.body.amount}but one of them doesnt exist`,
		})
		return res.status(400).json(err.message)
	}
	return res.json({ success: true })
})

export async function addGame(player: Player, opponent: Player, amount: number): Promise<void> {
	const db_player = await db.getPlayer(player)
	const db_opponent = await db.getPlayer(opponent)
	if (!db_opponent || !db_player) {
		throw new Error('Either the player or the opponent doesnt exist')
	}
	db.addGameToDB(db_player, db_opponent, db_player, amount)
	return
}
