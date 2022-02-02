const addHotels = require('./addhotels');
const addUsers = require('./addusers');

async function addToDb(resultArr, ctx) {
	const hotelsId = await addHotels(resultArr, ctx);
	await addUsers(hotelsId, ctx)
}

module.exports = addToDb;