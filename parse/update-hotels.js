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
			// let date = resultArr[i].info.match(/\n(.*)/)[1]; // берем дату из парс-данных
			let price = resultArr[i].price.match(/[0-9]/g).join('');
			let priceNew = { price: price, date: dateNumber }
			//обновление отелей
			let hotel = await Hotel.findOne({ name: resultArr[i].name, date: date });
			if (hotel) {
				console.log('обновление цены');
				for (let i = 0; i < resultArr.length; i++) {
					let hotel = await Hotel.findOne({ name: resultArr[i].name, date: date });
					hotel.prices.push(priceNew)
					await Hotel.findOneAndUpdate(
						{ name: resultArr[i].name },
						{ $set: { lastUpdate: dateString, prices: hotel.prices } }
					);
				}
				//добавление отелей
			} else {
				hotelNew = await Hotel({
					name: resultArr[i].name,
					url: url,
					airport: airport,
					resort: resort,
					night: nights,
					persons: persons,
					persons: kids,
					date: date,
					prices: priceNew,
					lastUpdate: dateString
				})
				//saved содержит все сохраненные документы
				let hotelsFromDb = await hotelNew.save().then(console.log('added to database...'))
			}
		}
	} catch (error) {
		console.log(error);
	}

}

module.exports = addToDb;