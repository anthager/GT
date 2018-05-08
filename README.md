# GurschTracker 

available routes:

`api/`
to confirm that the api is workign

`api/user`
to get a user

`api/users`
to get all users

`/api/session/add`
to add a user

`api/auth/:username`
to check if a user with username exist

`api/debts/:username/:from?/:to?`
to get all debts for a user from a date to a date, if not to or from is provided, all debts from the begining of time to this day will be fetched
