const User = require('./../models/user'),
Debt = require('./../models/debt'),
validator = require('validator'),
moment = require('moment')

function getDebtsForUser(username, from, to) {
	username = validator.toString(validator.escape(username))
	if(from){
		from = validator.toString(validator.escape(from))
		from = new Date(from)
	}
	if(to){
		to = validator.toString(validator.escape(to))
		to = new Date(to)
	}
	return new Promise(function (resolve, reject) {
		User.getId(username).then((id) => {
			if (!id) resolve({code: 204, message: 'no user with that username'})
			Debt.findAll(id)
			.then((debts) => {
				if (!debts.length) resolve({code: 204, message: 'no debts found for user'})
				const nameQueries = []
				debts.forEach((debt) => {
					nameQueries.push(formateDebt(debt._user1, debt._user2, debt.amount))
				})

				Promise.all(nameQueries)
				.then((debts) => {
					console.log(debts)
					resolve({
						data: debts,
						message: ':]',
						code: 200,
					})
				})
				.catch((err) => {
					if (err.code) reject(err)
					reject({
						message: "shits fucked up lol",
						code: 500
					})
				})
			})
			.catch((err) => {
				console.error(err)
				reject({
					message: "shits fucked up lol",
					code: 500
				})
			})
		})
		.catch((err) => {
			console.error(err)
			reject({
				message: "shits fucked up lol",
				code: 500
			})
		})
	})
}

//takes two ids and amount and a promise with the debt with usernames and amounts
function formateDebt(id1, id2, amount) {
	return new Promise(function(resolve, reject) {
		Promise.all([User.findById(id1), User.findById(id2)])
		.then((users) => {
			if(users[0]._id.toString() !== id1.toString()) amount *=-1
			
			resolve({
				user1: users[0].username,
				user2: users[1].username,
				amount: amount
			})
		})
		.catch((err) => {
			console.error(err)
			reject({
				message: "shits fucked up lol",
				code: 500})
			})
		})
	}
	
	module.exports = {
		getDebtsForUser: getDebtsForUser
	}