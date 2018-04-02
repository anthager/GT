const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
	_user1: {type: Schema.ObjectId, ref: 'user', required: true},
	_user2: {type: Schema.ObjectId, ref: 'user', required: true},
	amount: {type: Number, required: true},
},{
	timestamps: true
})

schema.statics.add = function(user1, user2, amount) {
	return new Promise((resolve, reject) => {
		this.create({_user1: user1.id, _user2: user2.id, amount: amount}, function(err, session) {
			if (err) console.error(err)
			console.log(`session between ${user1.username} and ${user2.username} saved`)
			resolve(session)
		})
	})
}

const Session = mongoose.model('session', schema)

module.exports = Session