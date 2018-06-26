const User = require('./../models/user')

function add(username) {
	return new Promise((resolve, reject) =>
		validateUsername(username)
			.then((values) =>
				User.create({
					username: username,
				})
					.then((user) => {
						console.log(`${user.username} was saved to db`)
						const deconUser = (({ username, createdAt }) => ({
							username,
							createdAt,
						}))(user)
						resolve({
							data: deconUser,
							code: 202,
						})
					})
					.catch(function(err) {
						console.error(err)
						if (err.name == 'BulkWriteError') {
							reject({
								code: 409,
								message: err.message,
							})
						} else {
							reject({
								message: 'declined cuz fuck you',
								code: 400,
							})
						}
					}),
			)
			.catch((err) => {
				console.error(err)
			}),
	)
}

function authUser(username) {
	return new Promise(function(resolve, reject) {
		User.find(
			{
				username: username,
			},
			{
				username: true,
				_id: false,
			},
			(err, user) => {
				if (err) reject({ code: 500 })
				if (user.length == 0) {
					console.log(`tried to auth ${username} but user is not registered`)
					resolve({ code: 404, message: `${username} doesnt exist` })
				}
				console.log(`authed ${username}`)
				resolve({
					message: `${user[0].username} is cool`,
					code: 200,
				})
			},
		)
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
