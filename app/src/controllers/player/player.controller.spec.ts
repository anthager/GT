// import { describe, it } from 'mocha'
// import * as chai from 'chai'
// import { expect } from 'chai'
// import { Request } from 'express'
// import 'chai-http'
// import { app } from '../../app'
// import { getConnection } from '../../services/databaseService'
// import * as testUtils from '../../utils/testUtils'

// const newchai = chai.use(require('chai-http'))

// describe('testing that the server works', () => {
// 	it('should return status 200"', async () => {
// 		newchai
// 			.request(app)
// 			.get('/api')
// 			.end((err, res) => {
// 				expect(res.status).to.equal(200)
// 			})
// 	})
// })

// // describe('adding player', () => {
// // 	before(testUtils.before)
// // 	after(testUtils.after)
// // 	it('should parse body successfully', async () => {
// // 		const body = { name: 'Petter', password: 'nej134' }
// // 		expect(parseBody(body)).to.deep.equal({ name: 'Petter', password: 'nej134', uid: -1 })
// // 	})
// // 	it('should parse body successfully with additional args', async () => {
// // 		const reqBody = { name: 'Petter', password: 'nej134', id: 12341, killed: 'Nicke' }
// // 		const resBody = { name: 'Petter', password: 'nej134', uid: -1 }
// // 		expect(parseBody(reqBody)).to.deep.equal(resBody)
// // 	})
// // 	it('should fail parse body with missspelled named', async () => {
// // 		const reqBody = { namme: 'Petter', password: 'nej134', id: 12341, killed: 'Nicke' }
// // 		expect(parseBody(reqBody)).to.equal(null)
// // 	})
// // 	it('should fail parse body with missspelled password', async () => {
// // 		const reqBody = { name: 'Petter', passwrd: 'nej134', id: 12341, killed: 'Nicke' }
// // 		expect(parseBody(reqBody)).to.equal(null)
// // 	})
// // 	it('should fail parse body with number as name', async () => {
// // 		const reqBody = { name: 14, password: 'nej134', id: 12341, killed: 'Nicke' }
// // 		expect(parseBody(reqBody)).to.equal(null)
// // 	})
// // 	it('should add a player', (done) => {
// // 		const player = { name: 'Petter', password: 'nej134', uid: 13415 }
// // 		newchai
// // 			.request(app)
// // 			.post('/api/player')
// // 			.send(player)
// // 			.end((err, res) => {
// // 				expect(res.status).to.equal(200)
// // 				expect(res.body).to.be.a('object')
// // 				expect(res.body).to.have.all.keys('name', 'id')
// // 				done()
// // 			})
// // 	})
// // 	it('should fail add a player', (done) => {
// // 		const player = { name: 'Petter', password: 'nej134', uid: 13415 }
// // 		newchai
// // 			.request(app)
// // 			.post('/api/player')
// // 			.send(player)
// // 			.end((err, res) => {
// // 				expect(res.status).to.equal(400)
// // 				done()
// // 			})
// // 	})
// // })
