import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import 'chai-http'
import { app } from '../../../app'
import * as testUtils from '../../../utils/testUtils'
import { Player } from '../../../models/interfaces'
import { getAllPlayers } from '../players/players'
import { BASEURL } from '../../../utils/variables'

declare global {
	namespace Express {
		export interface Request {
			player: Player
		}
	}
}

const newchai = chai.use(require('chai-http'))

describe('testing adding a post', () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should add a new post', async () => {
		const opponent: Partial<Player> = { name: 'Nina_test', id: 3 }
		const amount = 100
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.post(`${BASEURL}/restricted/games/new`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.send({ opponent, amount })
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body)
					.to.be.an('object')
					.that.have.deep.property('success', true)
			})
	})
	it('should fail validation due to opponent missing name', async () => {
		const opponent: Partial<Player> = { id: 3 }
		const amount = 100
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.post(`${BASEURL}/restricted/games/new`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.send({ opponent, amount })
			.then(res => {
				expect(res.status).to.equal(400)
				expect(res.body[0].msg)
					.to.be.an('string')
					.that.is.not.empty.that.is.eql('invalid opponent')
			})
	})
	it('should fail validation due to opponent missing', async () => {
		const amount = 100
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.post(`${BASEURL}/restricted/games/new`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.send({ amount })
			.then(res => {
				expect(res.status).to.equal(400)
				expect(res.body[0].msg)
					.to.be.an('string')
					.that.is.not.empty.that.is.eql('invalid opponent')
			})
	})
	it('should fail validation due to amount is missing ', async () => {
		const opponent: Partial<Player> = { name: 'Nina_test', id: 3 }
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.post(`${BASEURL}/restricted/games/new`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.send({ opponent })
			.then(res => {
				expect(res.status).to.equal(400)
				expect(res.body[0].msg)
					.to.be.an('string')
					.that.is.eql('invalid amount')
			})
	})
	it('should fail to add a new post due to opponent doesnt exist', async () => {
		const opponent: Partial<Player> = { name: 'INVALID USER', id: 7767678 }
		const amount = 100
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.post(`${BASEURL}/restricted/games/new`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.send({ opponent, amount })
			.then(res => {
				expect(res.status).to.equal(400)
				expect(res.body)
					.to.be.an('string')
					.that.is.eqls('Either the player or the opponent doesnt exist')
			})
	})
})
