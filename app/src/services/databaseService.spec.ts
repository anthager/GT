import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import 'chai-http'
import {
	getConnection,
	getPlayer,
	addPlayer,
	getAllPlayersExcept,
	getAllOpponents,
	getTotalSum,
} from '../services/databaseService'
import * as testUtils from '../utils/testUtils'
import { Player } from '../models/interfaces'

describe('testing the databse', async () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should get a valid database connection', async () => {
		expect(getConnection()).to.not.equals(null)
	})
	it('should add a player named simkarr', async () => {
		const player = { name: 'simkarr', password: 'nej134', id: 2 }
		await addPlayer(player)
		const res = await getPlayer(player)
		expect(res.name).to.equal('simkarr')
	})
	it('should add a player named Petter', async () => {
		const player = { name: 'Petter', password: 'nej134', id: 3 }
		delete player.id
		await addPlayer(player)
		const res = await getPlayer(player)
		expect(res.name).to.equal('Petter')
	})
	it('should get a player named anthager', async () => {
		const player = { name: 'anthager', password: 'nej134', id: 1 }
		const res = await getPlayer(player)
		expect(res.name).to.be.equal('anthager')
	})
	it('should get all players', async () => {
		const player = { name: 'anthager', password: 'nej134', id: 1 }
		const res = await getAllPlayersExcept(player)
		expect(res).to.be.an('array').that.is.not.empty
		expect(res[0])
			.to.be.an('object')
			.that.have.all.keys('name', 'id')
	})
	it('should get all opponents for a player', async () => {
		const player: Player = { name: 'Nicke_test', password: 'nej134', id: 2 }
		const res = await getAllOpponents(player)
		expect(res).to.be.an('array').that.is.not.empty
		expect(res[0])
			.to.be.an('object')
			.that.have.all.keys('player', 'amount')
		expect(res[0]).to.deep.equal({ player: { name: 'anthager', id: 1 }, amount: 54 })
	})
	it('should get the total sum for a player', async () => {
		const player: Player = { name: 'Nicke_test', password: 'nej134', id: 2 }
		const res = await getTotalSum(player)
		expect(res)
			.to.be.a('number')
			.that.is.eql(54)
	})
})
