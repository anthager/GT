import { describe, it } from 'mocha'
import * as chai from 'chai'
import { expect } from 'chai'
import 'chai-http'
import { app } from '../../app'
import * as testUtils from '../../utils/testUtils'
import { Player } from '../../models/interfaces'

declare global {
	namespace Express {
		export interface Request {
			player: Player
		}
	}
}

const newchai = chai.use(require('chai-http'))

describe('testing auth', () => {
	before(testUtils.before)
	after(testUtils.after)
	it('should register a player', done => {
		const player = { name: 'Petter', password: 'password', id: 13415 }
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a('string')
				done()
			})
	})
	it('should fail register a player due to missing name', done => {
		const player = { password: 'password' }
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				done()
			})
	})
	it('should fail register a player due to empty object', done => {
		const player = {}
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				done()
			})
	})
	it('should fail register a player due to missing password', done => {
		const player = { name: 'Nils' }
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				done()
			})
	})
	it('should fail register a player due to password is a number', done => {
		const player = { name: 'Nils', password: 45 }
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				done()
			})
	})
	it('should fail register a player due to username is used', done => {
		const player = { name: 'Petter', password: 'password' }
		newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body)
					.to.be.a('string')
					.that.equals('username is used')
				done()
			})
	})
	it('should log in a player', done => {
		const player = { name: 'Petter', password: 'password' }
		newchai
			.request(app)
			.post('/auth/login')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a('string').that.is.not.empty
				done()
			})
	})
	it('should fail to log in a player due to wrong password', done => {
		const player = { name: 'Petter', password: 'passworaa' }
		newchai
			.request(app)
			.post('/auth/login')
			.send(player)
			.end((err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body).to.be.a('string').that.is.not.empty
				expect(res.body).to.be.equal('wrong username or password')
				done()
			})
	})
	it('should register Karl and send a request to a restricted endpoint', async () => {
		const player = { name: 'Karl', password: 'password', id: 13418 }
		const token = await newchai
			.request(app)
			.post('/auth/register')
			.send(player)
			.then(res => {
				expect(res.status).to.equal(200)
				expect(res.body).to.be.a('string')
				return res.body
			})
		await newchai
			.request(app)
			.get('/restricted/')
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(200)
			})
	})
	it('should fail to auth with bad token', async () => {
		const token = 'badtoken'
		await newchai
			.request(app)
			.get('/restricted/players')
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(401)
			})
	})
	it('should fail to auth with edited token', async () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnsibmFtZSI6ImFudGhhZ2VyIiwiaWQiOjV9LCJpYXQiOjE1MzYzNjg0MTZ9.Yx4ibpq_yXgICxV0-W-H1tIkcYZl11JvrB3kVAqcPS4'
		await newchai
			.request(app)
			.get('/restricted/players')
			.set({
				authorization: `Bearer ${token}`,
			})
			.then(res => {
				expect(res.status).to.equal(401)
			})
	})
})
