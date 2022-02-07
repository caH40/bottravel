async function outputTracking(ctx) {
	// обработка данных подменю
	try {
		const cbData = ctx.update.callback_query.data;
		if (cbData.includes('airportTracking_')) {
			ctx.session.tracking[0][0].text = 'Город вылета ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
		if (cbData.includes('resortTracking_')) {
			ctx.session.tracking[0][1].text = 'Курорт ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
		if (cbData.includes('personsTracking_')) {
			ctx.session.tracking[1][0].text = 'Количество взрослых ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
		if (cbData.includes('kidsTracking_')) {
			ctx.session.tracking[1][1].text = 'Количество детей ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
		if (cbData.includes('nightsTracking_')) {
			ctx.session.tracking[2][0].text = 'Количество ночей ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
		if (cbData.includes('hotelTracking_')) {
			ctx.session.tracking[2][1].text = 'Отель ✔️';
			await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: ctx.session.tracking } }).catch((error) => console.log(error));
		};
	} catch (error) {
		console.log(error);
	}
}

module.exports = outputTracking;