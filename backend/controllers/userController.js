const User = require('./../models/user')

function add(username) {
	return new Promise(function (resolve, reject) {
		validateUsername(username).then(function (values) {
			User.create({
				username: username
			}).then(function (user) {
				console.log(`${user.username} was saved to db`)
				const deconUser = (({
					username,
					createdAt
				}) => ({
					username,
					createdAt
				}))(user)
				resolve({
					data: deconUser,
					code: 202,
				})
			}).catch(function (err) {
				console.error(err)
				if (err.name == 'BulkWriteError') {
					reject({
						code: 409,
						message: err.message,
					})
				} else {
					reject({
						message: 'declined cuz fuck you',
						code: 400
					})
				}
			})
		}).catch((err) => {
			console.error(err)
		})
	})
}

function getAll() {
	return new Promise(function (resolve, reject) {
		User.getAllUsernames().then((users) => {
				console.log(users)
				if (users.length == 0) {
					var code = 204
				} else {
					var code = 200
				}
				resolve({
					data: users,
					code: code
				})
			})
			.catch((err) => {
				console.error(err)
				reject({
					data: null,
					code: 500
				})
			})
	})
}

function remove(username) {
	new Promise(function (resolve, reject) {
		User.findOneAndUpdate({
			username: username
		}, {
			removed: true
		}, function (err, user) {
			if (err) console.error(err);
			console.log(`${user.username} was marked as removed`);
		})
	})
}

function validateUsername(username) {
	return new Promise(function (resolve, reject) {
		if (username !== undefined)
			resolve(username)
		else
			reject('username is invalid')
	})

}

function validateEmail(email) {
	return new Promise(function (resolve, reject) {
		if (email !== undefined)
			resolve(email)
		else
			reject("email is invalid")
	})
}

module.exports = {
	getAll: getAll,
	remove: remove,
	add: add
}