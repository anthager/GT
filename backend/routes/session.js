const express = require('express'),
router = express.Router(),
validator = require('validator'),
Session = require('./../models/session'),
User = require('./../models/user')
Debt = require('./../models/debt')

router.route('/all/:uuid')
.get((req, res) => {
	const _uuid = validator.toString(validator.escape(req.params.uuid))
	
	Session.find({$or :[{_winner: _uuid}, {_loser: _uuid}]})
	.populate({
		path: '_winner',
		select: 'username -_id'
	})
	.populate({
		path: '_loser',
		select: 'username -_id'
	})
	.then(function(session){
		console.log(session)
		res.status(200).json(session)
	})
})

//problems: - sender and opponent can be same - bad input can fuck up
router.route('/add')
.post(function(req, res) {
	const input = req.body
	Promise.all([User.getId(input.sender), User.getId(input.opponent)]).then(function(inUsers) {
		let [[user1], [user2]] = inUsers
		console.log(user1)
		console.log(user2)
		if (user1 === undefined || user2 === undefined){
			res.status(404).json('user doesnt exist')
		}
		const users = sortUsers(user1, user2)
		console.log(user1.username)
		if (users[0].username !== input.sender){
			input.amount *= -1
		}
		Promise.all([Session.add(users[0], users[1], input.amount), Debt.update(users[0], users[1], input.amount)])
		.then(function(values) {
			res.status(200).json({
				success: true, 
				sessionInfo: `session between ${users[0].username} and ${users[1].username} for ${input.amount} saved`, 
				debtInfo: `${users[0].username} and ${users[1].username} is now ${values[1].amount}`})
		})
	})
	.catch(function(err){
		console.error(err)
	})
})

function sortUsers(user1, user2){
	const comp = user1._id.toString().localeCompare(user2._id.toString(), "se-SE")
	if (comp < 0) {
		var sorted = [user1, user2]
	} else if (comp > 0) {
		var sorted = [user2, user1]
	} else {
		res.status(406).json({data: 'bad ids'})
	}
	return sorted
}


module.exports = router