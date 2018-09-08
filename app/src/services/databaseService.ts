import { Player } from '../models/interfaces'
import { Client } from 'pg'
import { dbName, dbUser } from '../config'
import * as queries from './queries'

export async function addPlayer(player: Player): Promise<any> {
	const client = await getConnection()
	const res = (await client.query(queries.addPlayer, [player.name, player.password])).rows[0]
	client.end()
	return res
}

export async function getConnection(): Promise<Client> {
	const client = new Client({
		user: dbUser,
		database: dbName,
	})
	await client.connect()
	return client
}

export async function getPlayer(player: Player): Promise<Player> {
	const client = await getConnection()
	const res = (await client.query(queries.getPlayerWithName, [player.name])).rows[0]
	client.end()
	return res
}

export async function getAllPlayersExcept(player: Player): Promise<Player[]> {
	const client = await getConnection()
	const players: Player[] = (await client.query(queries.getAllPlayersExcept, [player.id])).rows
	client.end()
	return players
}

export async function addGameToDB(
	winner: Player,
	loser: Player,
	submitter: Player,
	amount: number,
): Promise<void> {
	const client = await getConnection()
	await client.query(queries.addGame, [winner.id, loser.id, submitter.id, amount])
	client.end()
}
