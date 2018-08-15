import { Player } from '../../models/interfaces'
import { hash, compare } from 'bcrypt'
import { Router, Request, Response } from 'express'
import { addPlayer, getPlayer } from '../../services/databaseService'
import { sign } from 'jsonwebtoken'
import { secretKey } from '../../config'
import { logger } from '../../utils/logger'

const saltRounds = 10

export async function register(req: Request, res: Response) {
	let player: Player = req.player
	player.password = await hash(player.password, saltRounds)
	try {
		await addPlayer(player)
		player = await getPlayer(player.name)
		delete player.password
		sign({ player: player }, secretKey, (err: Error, token: string) => {
			if (err) {
				logger.log({ level: 'error', message: `failed to generate token for ${player.name}` })
				res.status(500).json()
			}
			console.log(token)
			res.status(200).json(token)
		})
	} catch (err) {
		switch (err.code) {
			case '42P01': {
				res.status(500).json('fail')
				break
			}
			default: {
				res.status(400).json('fail')
				break
			}
		}
	}
}

export async function login(req: Request, res: Response) {
	const requestPassword = req.player.password
	let player = await getPlayer(req.player.name)
	if (await compare(requestPassword, player.password)) {
		delete player.password
		sign({ player: player }, secretKey, (err: Error, token: string) => {
			if (err) {
				logger.log({ level: 'error', message: `failed to generate token for ${player.name}` })
				res.status(500).json()
			}
			res.status(200).json(token)
		})
	} else {
		res.status(400).json('wrong username or password')
	}
}

export function isPlayer(player: Player | null): player is Player {
	return truthy((<Player>player).name) && truthy((<Player>player).password)
}

function truthy(s: string): boolean {
	if (s && typeof s === 'string' && s.length) {
		return true
	}
	return false
}
