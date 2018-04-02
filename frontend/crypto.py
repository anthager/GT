import json

def encrypt(api, key):
	r = []
	for i in range(0,len(api)):
		k = key[i % len(key)]
		r.append(chr(ord(k) + ord(api[i])))
	return ''.join(r)

def decrypt(encrypted, key):
	r = []
	for i in range(0,len(encrypted)):
		k = key[i % len(key)]
		r.append(chr(ord(encrypted[i]) - ord(k)))
	return ''.join(r)

def addSettingToJson(key, value):
	settings = json.load(open('settings.json'))
	settings[key] = value
	with open('settings.json', 'w') as outfile:
		json.dump(settings, outfile, ensure_ascii=False)
  
def getApiUrl():
	settings = json.load(open('settings.json'))
	if (settings['key'] == ""):
		return {"success": False, "error": 'key not initalized'}
	return {"data": decrypt(settings['api'], settings['key']), "success": True}


# encrypted = data["api"]
# decrypted = decrypt(encrypted, '22KKAA')


# settings = {'api': encrypt('https://gurschtrackerprod-198913.appspot.com', '22KKAA')}
# with open('settings.json', 'w') as outfile:
#     json.dump(settings, outfile, ensure_ascii=False)

# encrypted = encrypt('https://gurschtrackerprod-198913.appspot.com', '22KKAA')
# decrypted = decrypt(encrypted, '22KKAA')

# print(encrypted)
# print(decrypted)