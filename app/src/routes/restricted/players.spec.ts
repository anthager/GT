import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import 'chai-http'
import { app } from '../../app'
import * as testUtils from '../../utils/testUtils'
import { Player } from '../../models/interfaces'
import { getAllPlayers } from './players'

declare global {
	namespace Express {
		export interface Request {
			player: Player
		}
	}
}

const newchai = chai.use(require('chai-http'))

describe('testing the fetching of all players', () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should get all players', async () => {
		const player = { name: 'Nicke_test', password: 'password', id: 2 }
		const players = await getAllPlayers(player)
		expect(players).to.be.a('array').that.is.not.empty
		expect(players[0])
			.to.be.an('object')
			.that.have.all.keys('name', 'id')
	})
	it('should get all players with a http call', async () => {
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.get('/restricted/players')
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.an('array').that.is.not.empty
				expect(res.body).to.be.an('array')
				expect(res.body).that.that.deep.include({ name: 'Nicke_test', id: 2 })
				// anthager is the default set player with the "InsaneHackerToken" token
				expect(res.body).that.that.not.deep.include({ name: 'anthager', id: 1 })
			})
	})
})
