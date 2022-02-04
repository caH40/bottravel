const keyboards = require('../keyboards');
const addUrl = require('../add-url');

async function sendRequest(ctx) {
	try {
		// проверка заполнения всех полей (поиск '---')
		let condition = false;
		const keys = Object.keys(ctx.session);
		keys.forEach(element => {
			condition = condition || (ctx.session[element] === '---')
		})

		if (condition) {
			await ctx.reply('Не все поля заполнены!!!', { reply_markup: { inline_keyboard: keyboards.back } })
		} else {
			// console.log(ctx.update.callback_query);
			for (let month = 2; month < 4; month++) {
				for (let day = 1; day < 32; day++) {
					let url = `https://level.travel/search/${ctx.session.airport}-RU-to-${ctx.session.resort}-TR-departure-${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.2022-for-${ctx.session.nigths}-nights-${ctx.session.persons}-adults-${ctx.session.kids}-kids-1..5-stars?sort_by=price,asc`;
					await addUrl(url, ctx, day, month)
				}
			}
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = sendRequest;