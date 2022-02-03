const Url = require('../models/Url');

async function addUrl(url) {
	const dateString = new Date().toLocaleString();
	const urlSearch = await Url.findOne({ url: url });
	//если уже есть url в базе, то не добавлять
	if (!urlSearch) {
		const urlNew = await new Url({ url: url, lastUpdate: dateString });
		await urlNew.save();
	}
}

module.exports = addUrl;





// await ctx.reply('Запрос с данными параметрами уже есть в базе, для просмотра результата нажмите /request')