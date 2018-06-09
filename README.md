# GurschTracker 

available routes:

`api/`
to confirm that the api is working

`api/user`
to create a new user
example:
`post: {
	"username": "anthage",
	"email": "anton@kul.tips"
}`

`api/users`
to get all users

`/api/session`
to add a session
example:
`post: {
	"sender": "anthage",
	"opponent": "simkarr",
	"amount": 12
}`

`api/auth/:username`
to check if a user with username exist
example:
`get: api/auth/anthage`

`api/debts/:username/:from?/:to?`
to get all debts for a user from a date to a date, if not to or from is provided, all debts from the begining of time to this day will be fetched
example:
`get: api/debts/anthage`