const express = require('express'),
router = express.Router(),
userController = require('../controllers/userController')
sessionController = require('../controllers/sessionController')
debtController = require('../controllers/debtController')

router.route('/user/add')
.post((req, res) => {
	const {username, email} = req.body
	userController.add(username, email)
	.then(({data, code}) => {
		res.status(code).json(data)
	})
	.catch(({code, message}) => {
		res.status(code).json(message)
	})
})

router.route('/users')
.get((req, res) => {
	userController.getAll()
	.then((resp) => {
		res.status(resp.code).json(resp.data)
	})
	.catch((err) => {
		res.status(err.code).json(err.data)
	})
})

router.route('/session/add')
.post((req, res) => {
	sessionController.add(req.body)
	.then(({message, code}) => {
		res.status(code).json(message)
	})
	.catch(({code, message}) => {
		res.status(code).json(message)
	})
})

router.route('/debts/:username/:from?/:to?')
.get((req, res) => {
	debtController.getDebtsForUser(
		req.params.username, 
		req.params.from,
		req.params.to
	)
	.then((obj) => {
		console.log(obj)
		const resObj = (({message, data}) => ({message, data}))(obj)
		res.status(obj.code).send(resObj)
	})
	.catch((err) => {
		res.status(err.code).json(err.message)
	})
})

router.route('/')
.get((req, res) => {
	res.status(200).send('working bby')
})

module.exports = router