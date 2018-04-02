const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
	username: {type: String, required: true, unique: true, index: true},
	email: {type: String, required: true, unique: true, index: true},
},{
	timestamps: true
}
)

schema.statics.getId = function(name) {
	return this.find({username: name}, {username: true, _id: true})
}

schema.statics.DgetId = function(name) {
	return new Promise((resolve, reject) => {
		this.find({username: name}, {username: true, _id: true}).then(function(inUser){
			console.log(inUser)
			const [{_id, username}] = inUser
			const user = {}
			user[username] = _id
			resolve(user)
		}).catch(function(err){
			console.error(err)
		})
	})
}



const User = mongoose.model('user', schema)

module.exports = User