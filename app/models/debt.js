const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
	_user1: {type: Schema.ObjectId, ref: 'user', required: true},
	_user2: {type: Schema.ObjectId, ref: 'user', required: true},
	// amount is to from user1s perspective 
	amount: {type: Number, required: true},
}, {
	timestamps: true
})
schema.index({_user1: 1, _user2: 1}, {unique: true})

schema.statics.updateDebt = function(user1, user2, amount) {
	return new Promise((resolve, reject) => {
		this.findOneAndUpdate(
			{ _user1: user1, _user2: user2 },
			{ $inc: { amount: amount } },
			{ upsert: true, new: true },
			function(err, debt) {
				if (err) console.error(err)
				console.log(`${user1.username} and ${user2.username} is now ${debt.amount}`)
				resolve(debt)
			},
		)
	})
}

schema.statics.findAll = function(userId, from = new Date(0), to = new Date()) {
	return this.find(
		{
			$or: [{ _user1: userId }, { _user2: userId }],
			createdAt: {
				$gte: from,
				$lt: to,
			},
		},
		{
			_user1: 1,
			_user2: 1,
			amount: 1,
			updatedAt: 1,
			_id: 0,
		},
	)
}

const Debt = mongoose.model('debt', schema)

module.exports = Debt
