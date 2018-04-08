import requests
devUrl = 'http://localhost:1337'

class ApiService:

	def __init__(self, apiUrl):
		self.apiUrl = apiUrl
	
	def createUser(self, username):
		payload = {"username": username}
		r = requests.post(self.apiUrl + '/api/user/new', data=payload)
		return r.status_code

	def newSession(self, username, opponent, amount):
		payload = {"sender": username, "opponent": opponent, "amount": amount}
		r = requests.post(self.apiUrl + '/api/session/add', data=payload)
		return r.status_code

	def login(self, username, password):
		return True

	def getDebts(self, username):
		pass

	def verifyKey(self, apiUrl):
		r = requests.get(apiUrl + '/verify')
		return r.json()['success']