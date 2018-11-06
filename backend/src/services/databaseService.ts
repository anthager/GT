import { Player, Opponent } from '../models/interfaces'
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

export async function getAllOpponents(player: Player): Promise<Opponent[]> {
	const client = await getConnection()
	const res: { name: string; id: number; amount: number }[] = (await client.query(
		queries.getOpponents,
		[player.id],
	)).rows
	const opponents: Opponent[] = res.map(_res => {
		return { player: { name: _res.name, id: _res.id }, amount: Number(_res.amount) || 0 }
	})
	client.end()
	return opponents
}

export async function getTotalSum(player: Player): Promise<number> {
	const client = await getConnection()
	const res = Number((await client.query(queries.getTotalSum, [player.id])).rows[0].sum || 0)
	client.end()
	return res
}

export async function createDatabase() {
	const client = new Client({ user: dbUser, database: dbName })
	await client.connect()
	await client.query(queries.createTablePlayer)
	await client.query(queries.createTableGame)
	await client.end()
}
