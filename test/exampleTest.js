const expect = require('chai').expect
const userController = require('../app/controllers/userController')
const request = require('supertest')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('../app/routes/routes')

const db_uri = 'mongodb://localhost:27017/gursch'
p = mongoose.connect(db_uri)
// app.get('/auth/:username', function(req, res) {

// })

app.use(routes)

describe ('test authing', function () {
	this.timeout(5000);
	it ('should auth', function(done) {
		p.then(function() {
			var username = 'anthage'
			request(app)
			.get('/auth/' + username)
			.expect(200)
			.expect('"anthage is cool"', done)
		})
	})
	it ('should not auth', function(done) {
		p.then(function() {
			var username = 'peter flygare'
			request(app)
			.get('/auth/' + username)
			.expect(404)
			.expect('"peter flygare doesnt exist"')
			.end(function (err, res) {
				if (err) console.error(err); return done(err)
				done()
			})
		})
	})
})