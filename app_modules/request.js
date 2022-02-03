const Hotel = require('../models/Hotel');


async function request(ctx) {
	try {
		const hotels = await Hotel.find();
		let hotelsFiltered = '';
		let hotelsSorted = hotels.sort((a, b) => a.prices[a.prices.length - 1].price - b.prices[b.prices.length - 1].price)
		for (let i = 0; i < 20; i++) {
			const nameHotel = hotelsSorted[i].name;
			const nameUrl = hotelsSorted[i].url;
			const nameDate = hotelsSorted[i].date;
			const namePrice = hotelsSorted[i].prices[hotelsSorted[i].prices.length - 1].price;
			console.log(namePrice, nameDate, nameHotel);
			hotelsFiltered = `${hotelsFiltered}${namePrice}р, ${nameDate}2022, <a href="${nameUrl}">${nameHotel}</a>\n`
		}
		const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
		await ctx.reply(hotelsFiltered, htmlDisPrev);
	} catch (error) {
		console.log(error);
	}

};


module.exports = request;