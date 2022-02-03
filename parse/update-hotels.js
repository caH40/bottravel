const Hotel = require('../models/Hotel');

async function addToDb(resultArr, url) {
	const dateString = new Date().toLocaleString();
	const dateNumber = new Date().getTime();
	let hotelsId = [];
	for (let i = 0; i < resultArr.length; i++) {
		let date = resultArr[i].info.match(/\n(.*)/)[1];
		let price = resultArr[i].price.match(/[0-9]/g).join('');
		let priceNew = { price: price, date: dateNumber }

		//обновление отелей
		let hotel = await Hotel.findOne({ name: resultArr[i].name, date: date });
		if (hotel) {
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
			console.log('Отель куда то исчез из базы...', resultArr[i])
		}
	}
}

module.exports = addToDb;

//пока работает только с 1 взрослым, 7 дней
// необходимо вытащить из урла данные для поиска уникального документа Hotel
// airport,resort,night,persons,kids

// https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-10.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc&flex_dates=2