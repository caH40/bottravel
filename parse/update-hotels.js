const Hotel = require('../models/Hotel');

async function addToDb(resultArr, url) {
	try {
		const dateString = new Date().toLocaleString();
		const dateNumber = new Date().getTime();
		const airport = url.match(/search\/(.*)-RU/)[1];
		const resort = url.match(/to-(.*)-TR/)[1];
		const nights = url.match(/-for-(.*)-nights/)[1];
		const persons = url.match(/nights-(.*)-adults/)[1];;
		const kids = url.match(/adults-(.*)-kids/)[1];
		let date = url.match(/\d\d\.\d\d\.\d\d\d\d/)[0];
		for (let i = 0; i < resultArr.length; i++) {
			let price = resultArr[i].price.match(/[0-9]/g).join('');
			let priceNew = { price: price, date: dateNumber }
			//обновление отелей
			let hotel = await Hotel.findOne({ hotel: resultArr[i].hotel, date: date });
			if (hotel) {
				console.log(dateString, 'обновление цены');
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
					airport: airport,
					resort: resort,
					night: nights,
					persons: persons,
					kids: kids,
					date: date,
					prices: priceNew,
					lastUpdate: dateString
				})
				//saved содержит все сохраненные документы
				await hotelNew.save().then(console.log(dateString, 'added to database...'))
			}
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = addToDb;