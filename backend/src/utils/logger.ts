import winston from 'winston'
import { format } from 'winston'
// import { ENVIRONMENT } from "./secrets";

const myFormat = format.printf(info => {
	return `${info.timestamp} ${info.level}: ${info.message}`
})
export const logger = winston.createLogger({
	format: format.combine(format.timestamp(), myFormat),
	silent: process.env.NODE_ENV === 'test',
	transports: [
		new winston.transports.Console({
			level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
		}),
		new winston.transports.File(
			process.env.NODE_ENV === 'production'
				? { filename: 'prod.log', level: 'info' }
				: { filename: 'debug.log', level: 'debug' },
		),
	],
})

logger.info(`Logging initialized at ${process.env.NODE_ENV} level`)
