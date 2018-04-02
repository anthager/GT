import crypto
import httpCalls
import json

settings = json.load(open('settings.json'))
api = settings['api']
if(not settings['prod']):
	api = settings['devApi']

def decodeApiUrl(key):
	return crypto.decrypt(api, key)

def firstTime():
	settings['key'] = input('What cards build Hägers hand? Start with the lowest in the format (XXXXXX)')
	rightKey = False
	while(not rightKey):
		global api
		api = decodeApiUrl(settings['key'])
		rightKey = httpCalls.verifyKey(api)
	print('Welcome..')
	print(api)
	userRegSuccess = False
	while(not userRegSuccess):
		username = input('Enter username:   ')
		userMail = input('Enter E-mail:   ')
		code = httpCalls.newUser(username, userMail, api)
		if (code == 200):
			userRegSuccess = True
			print('success')
		elif (code == 409):
			userRegSuccess = True
			print('success, using existing user')
		else: 
			userRegSuccess = False
			print('failed, try again')
			print('------')
	settings['user'] = username
	settings['firstTime'] = False
	with open('settings.json', 'w') as outfile:
		json.dump(settings, outfile, ensure_ascii=False)

if (settings['firstTime'] == True):
	firstTime()
else:
	api = decodeApiUrl(settings['key'])
	
print('logged in as ' + settings['user'])
opponent = input('opponent:    ')
amount = input('amount:   ')
httpCalls.newSession(settings['user'], opponent, amount, api)
