async function outputMain(ctx) {
	// обработка данных всех подменю
	const cbData = ctx.update.callback_query.data;
	if (cbData.includes('airport_')) {
		ctx.session.main[0][0].text = 'Город вылета ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error));
	};
	if (cbData.includes('resort_')) {
		ctx.session.main[0][1].text = 'Курорт ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error));
	};
	if (cbData.includes('persons_')) {
		ctx.session.main[1][0].text = 'Количество взрослых ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error));
	};
	if (cbData.includes('kids_')) {
		ctx.session.main[1][1].text = 'Количество детей ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error));
	};
	if (cbData.includes('nigths_')) {
		ctx.session.main[2][0].text = 'Количество ночей ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error));
	};
}

module.exports = outputMain;