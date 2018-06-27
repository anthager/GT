const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema(
	{
		username: { type: String, required: true, unique: true, index: true },
		removed: { type: Boolean },
	},
	{
		timestamps: true,
	},
)

schema.statics.getId = function(name) {
	return this.find({ username: name }, { username: true, _id: true })
}

schema.statics.getName = function(id) {
	return this.findById(id, { username: true })
}

schema.statics.getAllUsernames = function() {
	return this.find(
		{
			$or: [
				{
					removed: {
						$exists: false,
					},
				},
				{
					removed: false,
				},
			],
		},
		{
			_id: false,
			username: true,
		},
	)
}

schema.statics.getFormatedUsers = function(username1, username2) {
	return new Promise(function(resolve, reject) {
		Promise.all([User.getId(username1), User.getId(username2)])
			.then((inUsers) => {
				let [[user1], [user2]] = inUsers
				if (!(user1 && user2)) reject({ code: 404, message: 'invalid user(s)' })

				const users = sortUsers(user1, user2)
				if (!users) reject({ code: 406, message: 'bad ids' })
				resolve(users)
			})

			.catch((err) => {
				console.error(err)
				reject({ code: 500, message: ':(' })
			})
	})
}

function sortUsers(user1, user2) {
	const comp = user1._id.toString().localeCompare(user2._id.toString(), 'se-SE')
	if (comp < 0) {
		var sorted = [user1, user2]
	} else if (comp > 0) {
		var sorted = [user2, user1]
	} else {
		//cant access error here 
		res.status(406).json({ data: 'bad ids' })
	}
	return sorted
}

const User = mongoose.model('user', schema)

module.exports = User
