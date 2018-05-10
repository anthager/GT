const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose')
routes = require('./routes/routes')

const db_uri = process.env.DB_URI || 'mongodb://localhost:27017/gursch'
const startMessage = process.env.STARTMESSAGE || 'connected to mongodb in dev mode..'

console.log(db_uri + ' - ' + startMessage)

mongoose.connect(db_uri).then(function() {
	console.log(startMessage)
}).catch(function(err) {
	console.log(err)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', routes)

const PORT = process.env.PORT || 1337
app.listen(PORT, () => {
console.log(`App listening on port ${PORT}`)
console.log('Press Ctrl+C to quit.')
})