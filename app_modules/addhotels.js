const Hotel = require('../models/Hotel');

async function addToDb(resultArr, url) {
	const dateString = new Date().toLocaleString();
	const dateNumber = new Date().getTime();
	let hotelsId = [];
	let hotelNew;
	for (let i = 0; i < resultArr.length; i++) {
		let date = resultArr[i].info.match(/\n(.*)/)[1];
		let price = resultArr[i].price.match(/[0-9]/g).join('');
		let priceNew = { price: price, date: dateNumber }

		//обновление отелей
		let hotel = await Hotel.findOne({ hotel: resultArr[i].hotel, date: date });
		if (hotel) {
			for (let i = 0; i < resultArr.length; i++) {
				let hotel = await Hotel.findOne({ hotel: resultArr[i].hotel, date: date });
				hotel.prices.push(priceNew)
				await Hotel.findOneAndUpdate(
					{ hotel: resultArr[i].hotel },
					{ $set: { lastUpdate: dateString, prices: hotel.prices } }
				);
			}
			//добавление отелей
		} else {
			hotelNew = await Hotel({
				hotel: resultArr[i].hotel,
				url: url,
				airport: ctx.session.airport,
				resort: ctx.session.resort,
				night: ctx.session.nights,
				persons: ctx.session.persons,
				persons: ctx.session.kids,
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