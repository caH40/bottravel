const Url = require('../models/Url');

async function addUrl(url, ctx, day, month) {
	const dateString = new Date().toLocaleString();
	const urlSearch = await Url.findOne({ url: url });
	//фильтрация недействительной даты (дата ранее сегодняшнего дня)
	let incorrectDate;
	const dayNow = new Date().getDate();
	const monthNow = new Date().getMonth() + 1;
	if ((day < dayNow + 1) && month == monthNow) {
		incorrectDate = true
	} else {
		incorrectDate = false
	}
	//если уже есть url в базе, то не добавлять
	if (urlSearch || incorrectDate) {
		console.log('url есть в БД, или некорректная дата')
	}
	else {
		const urlNew = await new Url({ url: url, lastUpdate: dateString });
		await urlNew.save();
	}
	// оповещение, что запрос с такими фильтрами уже существует
	//чтобы не отсылать сообщение на каждый url, ждем наличия 31го числа

	// const urlEndMonth = url.match(/31.\d\d.\d\d\d\d/)
	// console.log(urlEndMonth);
	// if (urlEndMonth) { //условие выполняется так как только что добавили такие урлы!!!
	// 	await ctx.reply('Запрос с данными параметрами уже есть в базе, для просмотра результата нажмите /request')
	// }
}

module.exports = addUrl;





// await ctx.reply('Запрос с данными параметрами уже есть в базе, для просмотра результата нажмите /request')