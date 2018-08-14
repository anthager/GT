import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { logger } from './utils/logger'
import { router } from './routes'
import { Player } from './models/interfaces';

export const app = express()

app.options('*', cors())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', router)

const PORT = process.env.PORT || 1337
// for testin
if (!module.parent) {
	app.listen(PORT, () => {
		if (process.env.NODE_ENV !== 'test') {
			logger.log({
				level: 'debug',
				message: `started in ${
					process.env.NODE_ENV === 'production' ? 'production' : 'development'
				} mode`,
			})
		}
	})
}
