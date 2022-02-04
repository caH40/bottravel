const sendRequest = require('./send-request-main');
const outputMain = require('./output-main');
const keyboards = require('../keyboards');


async function handlerMain(ctx) {
	const userName = ctx.update.callback_query.from.username;
	ctx.session.main ??= keyboards.main;
	ctx.session.creatM = '@' + userName;
	const cbData = ctx.update.callback_query.data; // callback_data
	await ctx.deleteMessage(ctx.update.callback_query.message.message_id).catch(error => console.log(error));
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
		if (ctx.update.callback_query.data.includes(dataInput)) {
			const data = ctx.update.callback_query.data;
			const dataKey = dataInput.split('_').join('')
			ctx.session[dataKey] = data.split(dataInput).join('');
		}
	}
	await handlerData(ctx, 'airport_');
	await handlerData(ctx, 'resort_');
	await handlerData(ctx, 'kids_');
	await handlerData(ctx, 'persons_');
	await handlerData(ctx, 'nigths_');

	// отправка итогового объявления на канал объявлений
	if (cbData === 'sendRequest') {
		await sendRequest(ctx);
	};

	await outputMain(ctx)
}

module.exports = handlerMain