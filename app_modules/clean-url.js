const Url = require('../models/Url');

async function cleanUrl() {
	const dateToday = new Date().getTime();
	await Url.deleteMany({ date: { $lte: dateToday } })
		.then(console.log('Очистка выполнена'));
}


module.exports = cleanUrl;