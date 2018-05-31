const expect = require('chai').expect
const userController = require('../app/controllers/userController')
const request = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('../app/routes/routes')
const bodyParser = require('body-parser')
const User = require('../app/models/user')

const db_uri = 'mongodb://localhost:27017/gursch-test'
p = mongoose.connect(db_uri)
// app.get('/auth/:username', function(req, res) {

// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

describe ('test access', function () {
	this.timeout(5000);
	it ('should access', function(done) {
		p.then(function() {
			request(app)
			.get('/')
			.expect(200, done)
		})
	})
})

describe ('test adding users', function () {
	this.timeout(5000);
	it ('should add kalle', function(done) {
		p.then(function() {
			request(app)
			.post('/user')
			.send({username: 'kalle', email: 'kalle@gnail.com'})
			.expect(202, done)
		})
	})
	it ('should add karin', function(done) {
		p.then(function() {
			request(app)
			.post('/user')
			.send({username: 'karin', email: 'karin@gnail.com'})
			.expect(202, done)
		})
	})
	it ('should add pelle', function(done) {
		p.then(function() {
			request(app)
			.post('/user')
			.send({username: 'pelle', email: 'pelle@gnail.com'})
			.expect(202, done)
		})
	})
	it ('should fail adding kalle', function(done) {
		p.then(function() {
			request(app)
			.post('/user')
			.send({username: 'kalle', email: 'kalle@gnail.com'})
			.expect(409, done)
		})
	})
	it ('should fail adding user due to not providing a username', function(done) {
		p.then(function() {
			request(app)
			.post('/user')
			.send({})
			.expect(400, done)
		})
	})
})

describe ('test authing', function () {
	this.timeout(5000);
	it ('should auth kalle', function(done) {
		p.then(function() {
			var username = 'kalle'
			request(app)
			.get('/auth/' + username)
			.expect(200, done)
		})
	})
	it ('should auth pelle', function(done) {
		p.then(function() {
			var username = 'pelle'
			request(app)
			.get('/auth/' + username)
			.expect(200, done)
		})
	})
	it ('should not auth', function(done) {
		p.then(function() {
			var username = 'peter flygare'
			request(app)
			.get('/auth/' + username)
			.expect(404, done)
		})
	})
})

describe ('test user functions', function () {
	this.timeout(5000);
	it ('should get formated users', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			var username2 = 'pelle'
			return User.getFormatedUsers(username1, username2)
		})
		.then((users) => {
			const {_id : user1id} = users[0]
			const {_id : user2id} = users[1]
			expect(user1id.toString().localeCompare(user2id.toString(), 'se-SE')).to.be.lessThan(0)
			done()
		})
	})
	it ('should get formated users', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			var username2 = 'pelle'
			return User.getFormatedUsers(username2, username1)
		})
		.then((users) => {
			const {_id : user1id} = users[0]
			const {_id : user2id} = users[1]
			expect(user1id.toString().localeCompare(user2id.toString(), 'se-SE')).to.be.lessThan(0)
			done()
		})
	})
})

describe ('test sessions', function () {
	this.timeout(5000);
	it ('should add session between kalle and pelle', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			var username2 = 'pelle'
			request(app)
			.post('/session')
			.send({
				sender: username1,
				opponent: username2,
				amount: 20
			})
			.expect(200, done)
		})
	})
	it ('should add session between kalle and pelle', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			var username2 = 'pelle'
			request(app)
			.post('/session')
			.send({
				sender: username2,
				opponent: username1,
				amount: -20
			})
			.expect(200, done)
		})
	})
	it ('should add session between kalle and karin', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			var username2 = 'karin'
			request(app)
			.post('/session')
			.send({
				sender: username2,
				opponent: username1,
				amount: -20
			})
			.expect(200, done)
		})
	})
})

describe ('test debts', function () {
	this.timeout(5000);
	it ('Pelle should be 40 to kalle', function(done) {
		p.then(function() {
			var username1 = 'kalle'
			request(app)
			.get('/debts/kalle')
			.expect({
				data:[
					{
						user1: 'kalle',
						user2: 'pelle',
						amount: 40,
					},
					{
						user1: 'kalle',
						user2: 'karin',
						amount: 20,
					}
				],
				message: ':]'
			})
			.expect(200, done)
		})
	})
})