import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import { Client } from 'pg'
import { parseBody, nice } from '../controllers/player.controller'
import { Request } from 'express'
import 'chai-http'
import { app } from '../app'
import { getConnection, getPlayer, addPlayer } from '../services/databaseService'
import { dbUser, dbName } from '../config'
import * as testUtils from '../utils/testUtils'

const newchai = chai.use(require('chai-http'))

describe('testing the databse', async () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should get a valid database connection', async () => {
		expect(getConnection()).to.not.equals(null)
	})
	it('should add a player named simkarr', async () => {
		const player = { name: 'simkarr', password: 'nej134', uid: 2 }
		await addPlayer(player)
		const res = await getPlayer(player)
		expect(res.name).to.equal('simkarr')
	})
	it('should get a player named anthager', async () => {
		const player = { name: 'anthager', password: 'nej134', uid: 1 }
		const res = await getPlayer(player)
		expect(res.name).to.be.equal('anthager')
	})
})
