import { Player } from '../models/interfaces'
import { hash } from 'bcrypt'
import { Router, Request, Response } from 'express'
import { addPlayer, getPlayer } from '../services/databaseService'

const saltRounds = 10

async function getPlayersForUser(req: Request, res: Response) {
	return 'hej'
}

export async function newPlayer(req: Request, res: Response) {
	let player = parseBody(req.body)
	if (!player) {
		res.status(400).json('invalid input')
		return
	}
	player.password = await hash(player.password, saltRounds)
	try {
		await addPlayer(player)
		const resPlayer = await getPlayer(player)
		res.status(200).json(resPlayer)
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

export function parseBody(body: any): Player | null {
	const name: string = body.name
	const password: string = body.password
	if (name && password && typeof name === 'string' && typeof password === 'string') {
		return { name: name, password: password, uid: -1 }
	} else {
		return null
	}
}

export function checkNameAvailability() {}

export function nice(player: Player | null) {
	player as Player
	console.log(player)
}

export function isPlayer(player: Player | null): player is Player {
	return (<Player>player).name !== undefined
}
