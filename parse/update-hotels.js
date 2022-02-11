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
			let price = Number(resultArr[i].price.match(/[0-9]/g).join(''));
			let priceNew = { price: price, date: dateNumber }
			//обновление отелей
			//находим отель по уникальным параметрам
			const hotelExists = await Hotel.findOneAndUpdate(
				{ hotel: resultArr[i].hotelNameFromParse, url: url },
				{ $set: { lastUpdate: dateString, updated: true }, $push: { prices: priceNew } }
			).then(console.log(dateString, 'обновление цены'));;
			if (!hotelExists) {
				hotelNew = await Hotel({
					hotel: resultArr[i].hotelNameFromParse,
					url: url,
					airport: airport,
					resort: resort,
					night: nights,
					persons: persons,
					kids: kids,
					date: date,
					prices: priceNew,
					updated: false,
					lastUpdate: dateString
				})
				await hotelNew.save().then(console.log(dateString, 'added to database...'))
			}
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = addToDb;