import requests
devUrl = 'http://localhost:1337'

def newUser(name, email, apiUrl):
	payload = {"username": name,"email": email}
	r = requests.post(apiUrl + '/api/user/new', data=payload)
	return r.status_code

def newSession(user, opponent, amount, apiUrl):
	payload = {"sender": user, "opponent": opponent, "amount": amount}
	r = requests.post(apiUrl + '/api/session/add', data=payload)
	return r.status_code


def verifyKey(apiUrl):
	r = requests.get(apiUrl + '/verify')
	return r.json()['success']