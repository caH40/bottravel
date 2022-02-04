const Hotel = require('../models/Hotel');

async function addToDb(resultArr, url) {
	const dateString = new Date().toLocaleString();
	const dateNumber = new Date().getTime();
	const airport = url.match(/search\/(.*)-RU/)[1];
	const resort = url.match(/to-(.*)-TR/)[1];
	const nights = url.match(/-for-(.*)-nights/)[1];
	const persons = url.match(/nights-(.*)-adults/)[1];;
	const kids = url.match(/adults-(.*)-kids/)[1];
	let date = url.match(/[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9][0-9][0-9]/);
	for (let i = 0; i < resultArr.length; i++) {
		// let date = resultArr[i].info.match(/\n(.*)/)[1]; // берем дату из парс-данных
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
			console.log(hotelNew)
			//saved содержит все сохраненные документы
			let hotelsFromDb = await hotelNew.save().then(console.log('added to database...'))
		}
	}
}

module.exports = addToDb;


//пока работает только с 1 взрослым, 7 дней
// необходимо вытащить из урла данные для поиска уникального документа Hotel
// airport,resort,night,persons,kids


// https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-10.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc&flex_dates=2