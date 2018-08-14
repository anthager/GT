import { Client } from 'pg'
import { dbUser, dbName } from '../config'

export const before = async () => {
	const client = new Client({ user: dbUser, database: dbName })
	await client.connect()
	await client.query(
		'create table player (name varchar not null, password varchar not null, Is_Deleted boolean default false, id serial, primary key (id), UNIQUE (name), UNIQUE (id))',
	)
	await client.query(
		'create table game (Winner integer not null, Loser integer not null, Amount integer not null, id serial, foreign key (Winner) references player(id) on delete cascade, foreign key (Loser) references player(id) on delete cascade, primary key (id), UNIQUE (id))',
	)
	await client.query(
		"insert into player values ('anthager','$2b$10$qv6ToOjFiof55QB.OZI8puWHs1lSdo4ZhKuenRAr3.iAvfLi74IMm')",
	)
	await client.end()
}

export const after = async () => {
	const client = new Client({ user: dbUser, database: dbName })
	await client.connect()
	await client.query('drop table game')
	await client.query('drop table player')
	await client.end()
}
