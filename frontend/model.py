import apiService
import json

class Datasource:

	def __init__(self):
		config = json.load(open('config.json'))
		self.username = None if not 'username' in config else config['username']
		apiUrl = None if not 'apiUrl' in config else config['apiUrl']
		self.authed = False
		self.apiService = apiService.ApiService(apiUrl)

	def auth(self, username):
		pass

	def createUser(self, username):
		if (self.apiService.createUser(username) == 202):
			return True
		else:
			return False

	def setUsername(self, username):
		pass

	def addSession(self, sender, opponent, amount):
		pass

	def save(self):
		pass