const sendRequest = require('./send-search');
const outputSearch = require('./output-search');
const keyboards = require('../keyboards');


async function handlerSearch(ctx) {
	const userName = ctx.update.callback_query.from.username;
	ctx.session.search ??= keyboards.search;
	const cbData = ctx.update.callback_query.data; // callback_data
	// await ctx.deleteMessage(ctx.update.callback_query.message.message_id).catch(error => console.log(error));

	if (cbData === 'search') {
		ctx.session.airport = '---';
		ctx.session.resort = '---';
		ctx.session.kids = '---';
		ctx.session.persons = '---';
		ctx.session.nigths = '---';
		//при замене значения из модуля на keyboardSearch, смешиваются ответы из разных сессий!!
		ctx.session.search = [
			[
				{ text: 'Город вылета', callback_data: 'airport' },
				{ text: 'Курорт', callback_data: 'resort' }
			],
			[
				{ text: 'Количество взрослых', callback_data: 'persons' },
				{ text: 'Количество детей', callback_data: 'kids' }
			],
			[
				{ text: 'Количество ночей', callback_data: 'nigths' }
			],
			[
				{ text: 'Отправить запрос на обработку', callback_data: 'sendRequest' }
			]
		];
		await ctx.reply('Заполните форму запроса:', { reply_markup: { inline_keyboard: keyboards.search } });
	}

	if (cbData === 'airport') {
		await ctx.reply('Город вылета:', { reply_markup: { inline_keyboard: keyboards.airport } });
	}
	if (cbData === 'resort') {
		await ctx.reply('Курортный город:', { reply_markup: { inline_keyboard: keyboards.resort } });
	}
	if (cbData === 'kids') {
		await ctx.reply('Количество детей:', { reply_markup: { inline_keyboard: keyboards.kids } });
	}
	if (cbData === 'persons') {
		await ctx.reply('Количество взрослых:', { reply_markup: { inline_keyboard: keyboards.persons } });
	}
	if (cbData === 'nigths') {
		await ctx.reply('Количество ночей:', { reply_markup: { inline_keyboard: keyboards.nights } });
	}
	// обработка данных ввода

	async function handlerData(ctx, dataInput) {
		if (cbData.includes(dataInput)) {
			const data = cbData;
			const dataKey = dataInput.split('_').join('')
			//значение приходит с инлайн клавиатуры, оно находится после знака _
			ctx.session[dataKey] = data.split(dataInput).join('');
		}
	}
	await handlerData(ctx, 'airport_');
	await handlerData(ctx, 'resort_');
	await handlerData(ctx, 'kids_');
	await handlerData(ctx, 'persons_');
	await handlerData(ctx, 'nigths_');

	// отправка итогового запроса поиска в БД
	if (cbData === 'sendRequest') {
		await sendRequest(ctx);
	};

	await outputSearch(ctx)
}

module.exports = handlerSearch