const Hotel = require('../models/Hotel');

async function addToDb(resultArr) {
	const dateString = new Date().toLocaleString();
	const dateNumber = new Date().getTime();
	resultArr.forEach(async element => {
		let night = element.info.match(/^([^\n.]+)/)[0];
		let date = element.info.match(/\n(.*)/)[1];
		let price = element.price.match(/[0-9]/g).join('');
		let priceNew = { price: price, date: dateNumber }

		let hotel = await Hotel.findOne({ name: element.name, date: date });
		if (hotel) {
			hotel.prices.push(priceNew)
			await Hotel.findOneAndUpdate(
				{ name: element.name },
				{ $set: { lastUpdate: dateString, prices: hotel.prices } }
			);
		} else {
			let hotelNew = await Hotel({
				name: element.name,
				night: night,
				date: date,
				prices: priceNew,
				lastUpdate: dateString
			})
			await hotelNew.save();
		}
	})
}

module.exports = addToDb;