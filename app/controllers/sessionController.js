const Session = require('./../models/session')
const User = require('./../models/user')
const Debt = require('./../models/debt')

function add({
	sender,
	opponent,
	amount
}) {
	return User.getFormatedUsers(sender, opponent)
	.then((users) => {
		if (users[0].username !== sender){
			amount *= -1
		}
		return Promise.all([Session.add(users[0], users[1], amount), Debt.updateDebt(users[0], users[1], amount)])
	})
	.then((values) => {
		console.log(`${sender} and ${opponent} is now ${values[1].amount}`) 
		console.log(`session between ${sender} and ${opponent} for ${amount} saved`)
		return {
			code: 200,
			message : {
				opponent: opponent,
				amount: values[1].amount,
			}
		}
	})
	.catch((err) => {
		console.error(err)
		return{code: 500, message: 'shits fucked up yo'}
	})
}

module.exports = {
	add: add
}