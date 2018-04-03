const Session = require('./../models/session'),
User = require('./../models/user')
Debt = require('./../models/debt')

function add({
	sender,
	opponent,
	amount
}) {
	return new Promise(function(resolve, reject) {
		User.getFormatedUsers(sender, opponent)
		.then((users) => {
			if (users[0].username !== sender){
				amount *= -1
			}
			
			Promise.all([Session.add(users[0], users[1], amount), Debt.updateDebt(users[0], users[1], amount)])
			.then((values) => {
				resolve({
					code: 200,
					message : {
						success: true, 
						sessionInfo: `session between ${users[0].username} and ${users[1].username} for ${amount} saved`, 
						debtInfo: `${users[0].username} and ${users[1].username} is now ${values[1].amount}`
					}
				})
			})
			.catch((err) => {
				console.error(err)
				reject({code: 500, message: 'shits fucked up yo'})
			})
		})
		.catch((err) => {
			console.error(err)
			reject(err)
		})
	})
}

module.exports = {
	add: add
}