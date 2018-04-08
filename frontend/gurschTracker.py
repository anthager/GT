import argparse
import model

parse = argparse.ArgumentParser(description='Simple cli for gurschtracker', prog='GurschTracker')
parse.add_argument('-login', 
	'-l', 
	type=str
	)
parse.add_argument('-session', 
	'-s', 
	help='', 
	nargs=2, 
	type=str
	)
parse.add_argument('-debts',
	'-d',
	action='store_true'
	)
parse.add_argument('-createUser',
	'-cu',
	nargs=1,
	type=str
	)
args = parse.parse_args()
data = model.Datasource()

if (args.login):
	if (data.authed == True):
		print('Already logged in')
	else:
		data.auth(args.login)
	# data.username = args.login

if (args.createUser):
	if (data.createUser(args.createUser[0])):
		print('success')

if (args.session):
	pass

if (args.debts):
	print(args.debts)