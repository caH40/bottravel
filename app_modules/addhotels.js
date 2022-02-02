const Hotel = require('../models/Hotel');

async function addToDb(resultArr, ctx) {
	// console.log(ctx.session)

	const dateString = new Date().toLocaleString();
	const dateNumber = new Date().getTime();
	let hotelsId = [];
	let hotelNew;
	for (let i = 0; i < resultArr.length; i++) {
		// let night = resultArr[i].info.match(/^([^\n.]+)/)[0];
		let date = resultArr[i].info.match(/\n(.*)/)[1];
		let price = resultArr[i].price.match(/[0-9]/g).join('');
		let priceNew = { price: price, date: dateNumber }
		//добавление отелей
		let hotel = await Hotel.findOne({ name: resultArr[i].name, date: date });
		if (hotel) {
			hotel.prices.push(priceNew)
			await Hotel.findOneAndUpdate(
				{ name: resultArr[i].name },
				{ $set: { lastUpdate: dateString, prices: hotel.prices } }
			);
		} else {
			hotelNew = await Hotel({
				name: resultArr[i].name,
				airport: ctx.session.airport,
				resort: ctx.session.resort,
				night: ctx.session.nights,
				persons: ctx.session.persons,
				date: date,
				prices: priceNew,
				lastUpdate: dateString
			})
			//saved содержит все сохраненные документы
			let hotelsFromDb = await hotelNew.save().then(console.log('added to database...'));
			hotelsId.push(hotelsFromDb._id);
		}
	}
	return hotelsId
}

module.exports = addToDb;