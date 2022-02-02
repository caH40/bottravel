const Hotel = require('../models/Hotel');


async function request(ctx) {
	const hotels = await Hotel.find();
	let hotelsFiltered = '';
	let hotelsSorted = hotels.sort((a, b) => a.prices[a.prices.length - 1].price - b.prices[b.prices.length - 1].price)
	for (let i = 0; i < 7; i++) {
		const nameHotel = hotelsSorted[i].name;
		const nameDate = hotelsSorted[i].date;
		const namePrice = hotelsSorted[i].prices[hotelsSorted[i].prices.length - 1].price;
		console.log(namePrice, nameDate, nameHotel);
		hotelsFiltered = `${hotelsFiltered}${namePrice}р, ${nameDate}, ${nameHotel}\n`
	}
	ctx.reply(hotelsFiltered)
};


module.exports = request;