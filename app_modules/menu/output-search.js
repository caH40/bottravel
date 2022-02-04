async function outputSearch(ctx) {
	// обработка данных подменю
	const cbData = ctx.update.callback_query.data;
	if (cbData === 'edit') {
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
	if (cbData.includes('airport_')) {
		ctx.session.search[0][0].text = 'Город вылета ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
	if (cbData.includes('resort_')) {
		ctx.session.search[0][1].text = 'Курорт ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
	if (cbData.includes('persons_')) {
		ctx.session.search[1][0].text = 'Количество взрослых ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
	if (cbData.includes('kids_')) {
		ctx.session.search[1][1].text = 'Количество детей ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
	if (cbData.includes('nigths_')) {
		ctx.session.search[2][0].text = 'Количество ночей ✔️';
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.search } }).catch((error) => console.log(error));
	};
}

module.exports = outputSearch;