const addHotels = require('./addhotels');
const addUsers = require('./addusers');

async function addToDb(resultArr, ctx, url) {
	const hotelsId = await addHotels(resultArr, ctx, url);
	await addUsers(hotelsId, ctx)
}

module.exports = addToDb;