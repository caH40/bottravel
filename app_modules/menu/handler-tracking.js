const sendRequest = require('./send-tracking');
const outputTracking = require('./output-tracking');
const keyboards = require('../keyboards');
const getKeyboardHotels = require('../keyboard-hotels');

async function handlerTracking(ctx) {
	// const userName = ctx.update.callback_query.from.username;
	ctx.session.tracking ??= keyboards.tracking;
	const cbData = ctx.update.callback_query.data;
	// await ctx.deleteMessage(ctx.update.callback_query.message.message_id).catch(error => console.log(error));

	if (cbData === 'addTracking') {
		ctx.session.tracking = [
			[
				{ text: 'Город вылета', callback_data: 'airportTrack' },
				{ text: 'Курорт', callback_data: 'resortTrack' }
			],
			[
				{ text: 'Количество взрослых', callback_data: 'personsTrack' },
				{ text: 'Количество детей', callback_data: 'kidsTrack' }
			],
			[
				{ text: 'Количество ночей', callback_data: 'nightsTrack' },
				{ text: 'Отель', callback_data: 'hotelTrack' }
			],
			[
				{ text: 'Отправить запрос на обработку', callback_data: 'sendRequestTrack' }
			]
		];
		await ctx.reply('Заполните форму, все параметры являются необязательными:', { reply_markup: { inline_keyboard: keyboards.tracking } });
	}
	if (cbData === 'airportTrack') {
		await ctx.reply('Город вылета:', { reply_markup: { inline_keyboard: keyboards.airportTracking } });
	}
	if (cbData === 'resortTrack') {
		await ctx.reply('Курортный город:', { reply_markup: { inline_keyboard: keyboards.resortTracking } });
	}
	if (cbData === 'personsTrack') {
		await ctx.reply('Количество взрослых:', { reply_markup: { inline_keyboard: keyboards.personsTracking } });
	}
	if (cbData === 'kidsTrack') {
		await ctx.reply('Количество детей:', { reply_markup: { inline_keyboard: keyboards.kidsTracking } });
	}
	if (cbData === 'nightsTrack') {
		await ctx.reply('Количество ночей:', { reply_markup: { inline_keyboard: keyboards.nightsTracking } });
	}
	// формирование инлайн клавиатуры из отелей, полученных из БД
	const keyboardHotels = await getKeyboardHotels()
	if (cbData === 'hotelTrack') {
		await ctx.reply('Отель:', { reply_markup: { inline_keyboard: keyboardHotels } });
	}
	// обработка данных ввода

	async function handlerData(ctx, dataInput) {
		if (ctx.update.callback_query.data.includes(dataInput)) {
			const data = ctx.update.callback_query.data;
			const dataKey = dataInput.split('_').join('')
			ctx.session[dataKey] = data.split(dataInput).join('');
		}
	}
	await handlerData(ctx, 'airportTracking_');
	await handlerData(ctx, 'resortTracking_');
	await handlerData(ctx, 'kidsTracking_');
	await handlerData(ctx, 'personsTracking_');
	await handlerData(ctx, 'hotelTracking_');
	await handlerData(ctx, 'nightsTracking_');

	// отправка итогового объявления на канал объявлений
	if (cbData === 'sendRequestTrack') {
		await sendRequest(ctx);
	};

	await outputTracking(ctx);
}

module.exports = handlerTracking