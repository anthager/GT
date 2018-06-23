const User = require('./../models/user')

function add(username) {
	return validateUsername(username)
	.then(function (values) {
		return User.create({
			username: username
		})
	})
	.then(function (user) {
		console.log(`${user.username} was saved to db`)
		const deconUser = (({
			username,
			createdAt
		}) => ({
			username,
			createdAt
		}))(user)
		return {
			data: deconUser,
			code: 202,
		}
	})
	.catch(function (err) {
		if (err.code === 11000) {
			return {
				code: 409,
				message: 'err.message',
			}
		} else {
			return {
				code: 400,
				message: 'declined cuz fuck you',
			}
		}
	})
}

function authUser(username) {
	return User.find({
		username: username
	}, {
		username: true,
		_id: false
	}).then((user) => {
		if (user.length == 0) {
			console.log(`tried to auth ${username} but user is not registered`)
			return({code: 404, message: `${username} doesnt exist`})
		} else {
			console.log(`authed ${user}`)
			return({
				user: user,
				code: 200
			})
		}
	})
	.catch((err) => {
		return {code: 500}
	})
}

function getAmount(getTotal) {
	return new Promise(function(resolve, reject) {
	})
}

function getAll() {
	return new Promise(function(resolve, reject) {
		User.getAllUsernames()
			.then((users) => {
				console.log(`fetched: \n ${users}`)
				if (users.length == 0) {
					var code = 204
				} else {
					var code = 200
				}
				resolve({
					data: users,
					code: code,
				})
			})
			.catch((err) => {
				console.error(err)
				reject({
					data: null,
					code: 500,
				})
			})
	})
}

function remove(username) {
	new Promise((resolve, reject) =>
		User.findOneAndUpdate(
			{
				username: username,
			},
			{
				removed: true,
			},
			function(err, user) {
				if (err) console.error(err)
				console.log(`${user.username} was marked as removed`)
			},
		),
	)
}

function validateEmail(email) {
	return new Promise(function(resolve, reject) {
		if (email !== undefined) resolve(email)
		else reject('email is invalid')
	})
}

function validateUsername(username) {
	return new Promise(function(resolve, reject) {
		if (!username) reject('username is invalid')
		else resolve(username)
	})
}

module.exports = {
	authUser: authUser,
	getAll: getAll,
	remove: remove,
	add: add,
}
