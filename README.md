# GurschTracker

available routes:

`/`
to confirm that the api is working

`auth/register`
to register.
example:
`post: { "name": "anthage", "password": "password" }`

`auth/login`
to login.
example:
`post: { "name": "anthage", "password": "password" }`

`/restricted/players`
to get all players.

`restricted/games/new`
to add a new game.
Example:
`post: { "opponent"{ "name": "anthage", "password": "password" }, "amount": 20 }`

`restricted/players/opponents`
to get all of your opponents.

`restricted/players/total`
to get your total amount
