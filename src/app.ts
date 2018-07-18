import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as users from './controllers/users';
import validator from 'validator';
import bodyParser from 'body-parser'
import logger from './utils/logger';

const app = express()

const db_uri = process.env.DB_URI || 'mongodb://localhost:27017/gursch'
const startMessage = process.env.STARTMESSAGE || 'connected to mongodb in dev mode..'

mongoose
.connect(db_uri)
.then(function() {
	logger.log({
		level: 'debug',
		message: `connected to db in ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} mode`
	})
})
.catch(function(err) {
	logger.log({
		level: 'error',
		message: `failed to connect to db in ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} mode`
	})
})


app.options('*', cors());
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req, res) => {
	res.status(200).json('success')
})
app.post('/user', users.add)

const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
	logger.log({
		level: 'debug',
		message: `started in ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} mode`
	})
})