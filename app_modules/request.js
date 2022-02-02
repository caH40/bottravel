const Hotel = require('../models/Hotel');


async function request() {
	const hotels = await Hotel.find();
	let hotelsSorted = hotels.sort((a, b) => a.prices[a.prices.length - 1].price - b.prices[b.prices.length - 1].price)
	for (let i = 0; i < 7; i++) {
		const nameHotel = hotelsSorted[i].name;
		const nameDate = hotelsSorted[i].date;
		const namePrice = hotelsSorted[i].prices[hotelsSorted[i].prices.length - 1].price;
		console.log(namePrice, nameDate, nameHotel);

	}
};


module.exports = request;