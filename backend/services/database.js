const MongoClient = require('mongodb').MongoClient

function getUsers(){
	return MongoClient.connect('mongodb://localhost:27017/').then((client) => {
		const db = client.db('gursch')
		return db.collection('users').find().toArray()
	})
}

module.exports = { getUsers }