db.users.drop()
db.createCollection('users')
db.users.insert(
	[
		{
			"_id" : ObjectId("5ab181d87285d574a7c640b6"),
			"username" : "anthage",
			"email" : "anton@kul.tips",
			"createdAt" : ISODate("2018-03-22T16:26:57.491Z"),
			"updatedAt" : ISODate("2018-03-22T16:26:57.491Z"),
			"__v" : 0
		},
		{
			"_id" : ObjectId("5ab181d87285d574a7c640b7"),
			"username" : "simkarr",
			"email" : "simon@kul.tips",
			"createdAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"updatedAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"__v" : 0
		},
		{
			"_id" : ObjectId("5ab181d87285d574a7c640b8"),
			"username" : "vårjakob",
			"email" : "jakob@kul.tips",
			"createdAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"updatedAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"removed": true,
			"__v" : 0
		},
		{
			"_id" : ObjectId("5ab181d87285d574a7c640b9"),
			"username" : "erjaobk",
			"createdAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"updatedAt" : ISODate("2018-03-22T16:27:18.598Z"),
			"removed": false,
			"__v" : 0
		}
	]
)



db.sessions.drop()
db.createCollection('sessions')
db.sessions.insert(
	[
		{
			"_id" : ObjectId("5b0c979d2483f5341db66d5c"),
			"_user1" : ObjectId("5ab181d87285d574a7c640b6"),
			"_user2" : ObjectId("5ab181d87285d574a7c640b7"),
			"amount" : -12,
			"createdAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"updatedAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"__v" : 0
		},
		{
			"_id" : ObjectId("5b0c979d2483f5341db66d5c"),
			"_user1" : ObjectId("5ab181d87285d574a7c640b6"),
			"_user2" : ObjectId("5ab181d87285d574a7c640b7"),
			"amount" : -12,
			"createdAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"updatedAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"__v" : 0
		},
		{
			"_id" : ObjectId("5b0c979d2483f5341db66d5c"),
			"_user1" : ObjectId("5ab181d87285d574a7c640b6"),
			"_user2" : ObjectId("5ab181d87285d574a7c640b7"),
			"amount" : 12,
			"createdAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"updatedAt" : ISODate("2018-05-28T23:58:21.879Z"),
			"__v" : 0
		}
	]
)

db.debts.drop()
db.createCollection('debts')
db.debts.insert(
	[
		{
			"_id" : ObjectId("5b0d4499e8b1e40d9e8dd9ef"),
			"_user1" : ObjectId("5ab181d87285d574a7c640b6"),
			"_user2" : ObjectId("5ab181d87285d574a7c640b7"),
			"__v" : 0,
			"amount" : -24,
			"createdAt" : ISODate("2018-05-29T12:16:25.824Z"),
			"updatedAt" : ISODate("2018-05-29T12:16:25.824Z")
		}
	]
)
