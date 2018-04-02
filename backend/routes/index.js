const express = require('express')
const router = express.Router()

router.get('/', (req, res, err) => {
	res.status(200).json('Welcome to my api!')
})

router.get('/verify', (req, res) => {
	res.status(200).json({success: true})
})


module.exports = router