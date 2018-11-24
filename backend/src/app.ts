import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { logger } from './utils/logger'
import { router } from './routes'
import { Player } from './models/interfaces'
import * as db from './services/databaseService'
import morgan = require('morgan')

export const app = express()
const reconnectIntervall = 3000

app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.json('hehe'))
app.use('/api', router)
const PORT = 1337

function createDatabase() {
	let success = true
	const interval = setInterval(async () => {
		try {
			const player: Player = { name: 'Anton', password: '', id: 0 }
			logger.info('attempting to connect to database...')
			await db.getAllPlayersExcept(player)
			logger.info('connected to database successfully')
			clearInterval(interval)
		} catch (err) {
			if (err.code === 'ECONNREFUSED') {
				logger.warn(
					`connecting to database failed, attempting to reconnect in ${reconnectIntervall}ms...`,
				)
				success = false
			} else if (err.code === '42P01') {
				logger.warn('connecting to database successfully, but tables not found, creating...')
				let success = true
				await db.createDatabase()
				logger.warn('tables created')
			} else {
				logger.error(`unknow error: ${err}`)
				success = false
				logger.warn(
					`connecting to database failed, attempting to reconnect in ${reconnectIntervall}ms...`,
				)
			}
		} finally {
			if (success) {
				clearInterval(interval)
			}
		}
	}, reconnectIntervall)
}
// for testin
if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('common'))
	createDatabase()
	app.listen(PORT, () => {
		logger.info(`started in ${process.env.NODE_ENV} mode at ${PORT}`)
	})
}
