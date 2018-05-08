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
// db.createCollection('sessions')
// db.sessions.insert(
// 	[
// 		{
// 			"_id" : ObjectId("5ab187dfbbfff48f28876288"),
// 			'_winner': ObjectId("5ab181d87285d574a7c640b7"),
// 			'_loser': ObjectId("5ab181d87285d574a7c640b6"),
// 			'amount': 12,
// 		},
// 		{
// 			"_id" : ObjectId("5ab187dfbbfff48f28876289"),
// 			'_winner': ObjectId("5ab181d87285d574a7c640b6"),
// 			'_loser': ObjectId("5ab181d87285d574a7c640b7"),
// 			'amount': 20,
// 		}
// 	]
// )

db.debts.drop()
