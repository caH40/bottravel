const addUser = require('../adduser');

async function sendRequest(ctx) {
	try {
		const filter = {};
		if (ctx.session.hotelTracking) { filter.hotel = ctx.session.hotelTracking }
		if (ctx.session.airportTracking) { filter.airport = ctx.session.airportTracking }
		if (ctx.session.resortTracking) { filter.resort = ctx.session.resortTracking }
		if (ctx.session.nightsTracking) { filter.night = ctx.session.nightsTracking }
		if (ctx.session.personsTracking) { filter.persons = ctx.session.personsTracking }
		if (ctx.session.kidsTracking) { filter.kids = ctx.session.kidsTracking }

		// добавление фильтра поиска отелей в документ User
		const userId = ctx.update.callback_query.from.id;
		await addUser(ctx, userId, filter);
	} catch (error) {
		console.log(error)
	}
}

module.exports = sendRequest;