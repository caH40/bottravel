const Url = require('../models/Url');

async function addUrl(url, day, month) {
	try {
		const dateTravel = new Date(`${new Date().getFullYear()}-${month}-${day}`).getTime();
		const dateString = new Date().toLocaleString();
		const urlExists = await Url.findOne({ url: url });
		//если уже есть url в базе, или дата не корректна то не добавлять
		if (urlExists) {
			console.log('url есть в БД, или некорректная дата')
		}
		else {
			const urlNew = await new Url({
				url: url,
				date: dateTravel,
				lastUpdate: dateString
			}
			);
			await urlNew.save();
			// console.log('url добавлен...')
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = addUrl;