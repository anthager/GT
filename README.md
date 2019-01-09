# GurschTracker
https://gursch.anton.pizza <br/> If the site is not available my gcloud credits has probably run out :(

Available routes in backend-app:

`/`
to confirm that the api is working

`/auth/register`
to register.
example:
`post: { "name": "anthage", "password": "password" }`

`/auth/login`
to login.
example:
`post: { "name": "anthage", "password": "password" }`

`/restricted/players`
to get all players.

`/restricted/games/new`
to add a new game.
Example:
`post: { "opponent"{ "name": "anthage", "password": "password" }, "amount": 20 }`

`/restricted/players/opponents`
to get all of your opponents.

`/restricted/players/total`
to get your total amount

* Certs should be placed in secrets/certs 
* A file called password and a file called username should be placed in secrets/db/
* To get all the secrets up the commands in kubernetes/creatingSecrets.sh should be run, the ssl one does not work perfectly right now. Instead one could create a secret with a file with data: tls.crt and tls.key as keys and put the base64 encoded fullchain.pom and privkey.pom respectively as value.
