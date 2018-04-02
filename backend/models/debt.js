const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
	_user1: {type: Schema.ObjectId, ref: 'user', required: true, index: true, unique: true},
	_user2: {type: Schema.ObjectId, ref: 'user', required: true, index: true, unique: true},
	// amount is to from user1s perspective 
	amount: {type: Number, required: true},
}, {
	timestamps: true
})

schema.statics.update = function(user1, user2, amount) {
	return new Promise((resolve, reject) => {
		this.findOneAndUpdate({_user1: user1, _user2: user2}, {$inc:{amount: amount}}, {upsert: true, new: true}, function(err, debt) {
			if(err) console.error(err)
			console.log(`${user1.username} and ${user2.username} is now ${debt.amount}`)
			resolve(debt)
		})
	}) 
}

const Debt = mongoose.model('debt', schema)

module.exports = Debt