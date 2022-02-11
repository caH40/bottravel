const Url = require('../models/Url');

async function addUrl(url, day, month) {
	try {
		const dateString = new Date().toLocaleString();
		const urlSearch = await Url.findOne({ url: url });
		//фильтрация недействительной даты (дата ранее сегодняшнего дня)
		var incorrectDate;
		const dayNow = new Date().getDate();
		const monthNow = new Date().getMonth() + 1;
		if ((day < dayNow + 1) && month == monthNow) {
			incorrectDate = true
		} else {
			incorrectDate = false
		}
		//если уже есть url в базе, или дата не корректна то не добавлять
		if (urlSearch || incorrectDate) {
			console.log('url есть в БД, или некорректная дата')
		}
		else {
			const urlNew = await new Url({ url: url, lastUpdate: dateString });
			await urlNew.save();
			// console.log('url добавлен...')
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = addUrl;