const expect = require('chai').expect
function add (x, y) {
	return x + y
}

describe ('add two numbers()', function () {
	it ('should add two numbers', function() {
		const exp = 14
		const act = add(9, 5)

		expect(act).to.be.equal(exp)
	})
})