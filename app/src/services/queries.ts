import { QueryConfig } from 'pg'

const getPlayers: QueryConfig = {
	text: 'SELECT * FROM player',
}
export const getPlayerWithName = 'SELECT name, id, password FROM player WHERE name = $1::text'
export const addPlayer = 'INSERT INTO player VALUES ($1::text, $2::text)'
