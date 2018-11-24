import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import 'chai-http'
import { app } from '../../../app'
import * as testUtils from '../../../utils/testUtils'
import { Player } from '../../../models/interfaces'
import { getAllPlayers, getAllOpponents, getTotal } from './players'
import { BASEURL } from '../../../utils/variables'

declare global {
	namespace Express {
		export interface Request {
			player: Player
		}
	}
}

const newchai = chai.use(require('chai-http'))

describe('testing sending a request to the server', () => {
	it('should get a http 200 back for the request', async () => {
		await newchai
			.request(app)
			.get('/')
			.then(res => {
				expect(res.status).to.equal(200)
			})
	})
})
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
			.get(`${BASEURL}/restricted/players/all`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.an('array').that.is.not.empty
				expect(res.body).to.be.an('array')
				expect(res.body).that.that.deep.include({ name: 'Nicke_test', id: 2 })
				// anthager is the default player with the "InsaneHackerToken" token
				expect(res.body).that.that.not.deep.include({ name: 'anthager', id: 1 })
			})
	})
})
describe('testing the fetching of all opponents', () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should get all opponents', async () => {
		const player = { name: 'Nicke_test', password: 'password', id: 2 }
		const players = await getAllOpponents(player)
		expect(players).to.be.a('array').that.is.not.empty
		expect(players[0])
			.to.be.an('object')
			.that.have.all.keys('player', 'amount')
		expect(players[0]).to.be.deep.equals({ player: { name: 'anthager', id: 1 }, amount: 54 })
	})
	it('should get all opponents with a http call', async () => {
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.get(`${BASEURL}/restricted/players/opponents`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.an('array').that.is.not.empty
				expect(res.body).to.be.an('array')
				expect(res.body[0]).to.deep.equals({ player: { name: 'Nicke_test', id: 2 }, amount: -54 })
				// anthager is the default player with the "InsaneHackerToken" token
				expect(res.body).that.that.not.deep.include({ name: 'anthager', id: 1 })
			})
	})
})
describe('testing fetching of total', () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should get total', async () => {
		const player = { name: 'Nicke_test', password: 'password', id: 2 }
		const total = await getTotal(player)
		expect(total)
			.to.be.a('number')
			.that.is.equals(54)
	})
	it('should get total with a http call', async () => {
		const token = 'InsaneHackerToken'
		await newchai
			.request(app)
			.get(`${BASEURL}/restricted/players/total`)
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body)
					.to.be.an('number')
					.that.is.equals(-54)
			})
	})
})
