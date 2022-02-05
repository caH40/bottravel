// const addUrl = require('../add-url');
const Hotel = require('../../models/Hotel');

async function sendRequest(ctx) {
	try {
		// console.log(ctx.session)
		const filter = {};
		if (ctx.session.hotelTracking) { filter.hotel = ctx.session.hotelTracking }
		if (ctx.session.airportTracking) { filter.airport = ctx.session.airportTracking }
		if (ctx.session.resortTracking) { filter.resort = ctx.session.resortTracking }
		if (ctx.session.nightsTracking) { filter.night = ctx.session.nightsTracking }
		if (ctx.session.personsTracking) { filter.persons = ctx.session.personsTracking }
		if (ctx.session.kidsTracking) { filter.kids = ctx.session.kidsTracking }
		const hotels = await Hotel.find(filter);
		//проверка наличия документов в коллекции hotels
		if (hotels[0]) {
			let hotelsFiltered = '';
			let hotelsSorted = hotels.sort((a, b) => a.prices[a.prices.length - 1].price - b.prices[b.prices.length - 1].price)
			let iteration;
			if (hotelsSorted.length < 15) {
				iteration = hotelsSorted.length
			} else {
				iteration = 15
			}
			for (let i = 0; i < iteration; i++) {
				const nameHotel = hotelsSorted[i].hotel;
				const nameUrl = hotelsSorted[i].url;
				const nameDate = hotelsSorted[i].date;
				const nameNight = hotelsSorted[i].night;
				const nameAirport = hotelsSorted[i].airport;
				const namePrice = hotelsSorted[i].prices[hotelsSorted[i].prices.length - 1].price;
				// console.log(namePrice, nameDate, nameHotel);
				hotelsFiltered = `${hotelsFiltered}${namePrice}р, ${nameDate},  ${nameNight} ночей, ${nameAirport}, <a href="${nameUrl}">${nameHotel.match(/.{1,20}/)}</a>\n`
			}
			const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
			await ctx.reply(hotelsFiltered, htmlDisPrev);

		} else {
			await ctx.reply('Что то пошло не так, база данных пустая...');
		}


	} catch (error) {
		console.log(error)
	}
}

module.exports = sendRequest;