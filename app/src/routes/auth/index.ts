import { validateRegisterInput, validateLoginInput } from '../../middleware/validateRequest'
import { Player } from '../../models/interfaces'
import { hash, compare } from 'bcrypt'
import { Router, Request, Response } from 'express'
import { addPlayer, getPlayer } from '../../services/databaseService'
import { sign } from 'jsonwebtoken'
import { secretKey } from '../../config'
import { logger } from '../../utils/logger'

export const router = Router()
const saltRounds = 10

router.post('/register', ...validateRegisterInput, async (req: Request, res: Response) => {
	let player: Player = req.player
	player.password = await hash(player.password, saltRounds)
	try {
		await addPlayer(player)
		player = await getPlayer(player)
		delete player.password
		sign({ player: player }, secretKey, (err: Error, token: string) => {
			if (err) {
				logger.log({ level: 'error', message: `failed to generate token for ${player.name}` })
				res.status(500).json()
			} else {
				logger.log({ level: 'info', message: `registered ${player.name}` })
				res.status(200).json(token)
			}
		})
	} catch (err) {
		switch (err.code) {
			case '42P01': {
				res.status(500).json('fail')
				break
			}
			case '23505': {
				res.status(400).json('username is used')
				break
			}
			default: {
				res.status(400).json('fail')
				break
			}
		}
	}
})
router.post('/login', ...validateLoginInput, async (req: Request, res: Response) => {
	let player = await getPlayer(req.player)
	if (await compare(req.player.password, player.password)) {
		delete player.password
		sign({ player: player }, secretKey, (err: Error, token: string) => {
			if (err) {
				logger.log({ level: 'error', message: `failed to generate token for ${player.name}` })
				res.status(500).json()
			} else {
				logger.log({ level: 'info', message: `logged in ${player.name}` })
				res.status(200).json(token)
			}
		})
	} else {
		logger.log({
			level: 'info',
			message: `failed to login, ${player.name}: wrong password or username`,
		})
		res.status(400).json('wrong username or password')
	}
})
