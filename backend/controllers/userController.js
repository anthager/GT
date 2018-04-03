const User = require('./../models/user')

function add(username, email) {
	return new Promise(function (resolve, reject) {
		Promise.all([validateUsername(username), validateEmail(email)]).then(function (values) {
			User.create({username: username, email: email}).then(function (user) {
				console.log(`${user.username} was saved to db`)
				const deconUser = (({username, email, createdAt}) => ({username, email, createdAt}))(user)
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

function remove(username) {
	new Promise(function (resolve, reject) {
		User.findOneAndUpdate({
			username: username
		}, {
			removed: true
		}, function (err, user) {
			if (err) console.error(err);
			console.log(`${user.username} was marked as deleted`);
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
	remove: remove,
	add: add
}