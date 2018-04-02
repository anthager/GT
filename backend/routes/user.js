const express = require('express')
const router = express.Router(),
User = require('./../models/user')

router.route('/new')
.post((req, res) => {
	const data = req.body
	User.create(data).then(function(user) {
		console.log(`${user.username} was saved to db`)
			res.status(200).json({
				success: true,
				data: user
			})
	}).catch(function(err) {
		console.error(err)
		if (err.name == 'BulkWriteError'){
			res.status(409).json({
				message: err.user
			})
		} else {
			res.status(400).json({
				message: err
			})
		}
	})
})


module.exports = router