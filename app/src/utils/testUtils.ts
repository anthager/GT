import { Client } from 'pg'
import { dbUser, dbName } from '../config'
import * as queries from '../services/queries'

export const before = async () => {
	const client = new Client({ user: dbUser, database: dbName })
	await client.connect()
	await client.query(queries.createTablePlayer)
	await client.query(queries.createTableGame)
	await client.query(
		"insert into player values ('anthager','$2b$10$qv6ToOjFiof55QB.OZI8puWHs1lSdo4ZhKuenRAr3.iAvfLi74IMm')",
	)
	await client.query(
		"insert into player values ('Nicke_test','$2b$10$qv6ToOjFiof55QB.OZI8puWHs1lSdo4ZhKuenRAr3.iAvfLi74IMm')",
	)
	await client.query(
		"insert into player values ('Nina_test','$2b$10$qv6ToOjFiof55QB.OZI8puWHs1lSdo4ZhKuenRAr3.iAvfLi74IMm')",
	)
	await client.query(
		"insert into player values ('Petter_test','$2b$10$qv6ToOjFiof55QB.OZI8puWHs1lSdo4ZhKuenRAr3.iAvfLi74IMm')",
	)
	await client.query('insert into game values (1, 2, 1, 19)')
	await client.query('insert into game values (1, 2, 1, 19)')
	await client.query('insert into game values (1, 2, 1, 19)')
	await client.query('insert into game values (1, 2, 1, 19)')
	await client.query('insert into game values (2, 1, 2, 26)')
	await client.query('insert into game values (2, 1, 2, 26)')
	await client.query('insert into game values (2, 1, 2, 26)')
	await client.query('insert into game values (2, 1, 2, 26)')
	await client.query('insert into game values (2, 1, 2, 26)')
	await client.end()
}

export const after = async () => {
	const client = new Client({ user: dbUser, database: dbName })
	await client.connect()
	await client.query('drop table game')
	await client.query('drop table player')
	await client.end()
}
