const express = require('express'),
router = express.Router(),
validator = require('validator'),
User = require('./../models/user')
Debt = require('./../models/debt')

router.route('/:user')
.get((req, res, err) => {
	const username = validator.toString(validator.escape(req.params.user))
	User.find({username: username},{_id: true}).then(function(user) {
		Dept.find({$or: [{user1: user._id}, {user2: user._id}]}, function(err, depts) {
			if (err) console.error(err)
			res.status(200).json({
				success: true,
				data: dept
			})
		})
	}).catch(function(err) {
		console.error(err)
	})
})

router.route('/add')
.post(function(req, res) {
	const input = req.body
	// console.log(input)
	const promiseUser1 = User.find({username: input.user1},{_id: true})
	const promiseUser2 = User.find({username: input.user2},{_id: true})

	Promise.all([promiseUser1, promiseUser2]).then(function(ids){
		let [[{_id:id1}], [{_id:id2}]] = ids
		const debt = sortIds(id1.toString(), id2.toString())
		debt.amount = input.amount
	
		Debt.create(debt, function(err, dept) {
			if(err) console.error(err)
			console.log(`debt between ${input.user1} and ${input.user2} created`)
			res.status(200).json({success: true, debt: debt})
		})
	}).catch(function(err){
		console.error(err)
	})
})

function sortIds(user1, user2){
	const comp = user1.localeCompare(user2, "se-SE")
	if (comp < 0) {
		var sorted = {_user1: user1, _user2 :user2}
	} else if (comp > 0) {
		var sorted = {_user1: user2, _user2 :user1}
	} else {
		res.status(406).json({data: 'bad ids'})
	}
	return sorted
}

router.route

module.exports = router