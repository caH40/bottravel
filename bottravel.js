require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');

const text = require('./app_modules/text');
const getHotelName = require('./app_modules/fromdb');
const keyboards = require('./app_modules/keyboards');
const request = require('./app_modules/request');
const sendRequest = require('./app_modules/send-request');



const bot = new Telegraf(process.env.BOT_TOKEN);

// подключение к базе данных
mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..');
	})
	.catch((error) => {
		console.log(error);
	});

bot.catch((error, ctx) => {
	console.log(`Oops, encountered an error for ${ctx.updateType}`, error);
});

bot.use(session());
// let urlObj;

const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };

bot.start(async (ctx) => {
	const userName = ctx.update.message.from.username;
	await ctx.reply(`Привет ${userName ? userName : 'незнакомец'} ! ${text.start}`, htmlDisPrev)
		.catch((error) => console.log(error));
});

bot.help(async (ctx) => {
	await ctx.reply(text.commands, htmlDisPrev).catch((error) => console.log(error));
});

// главное меню
bot.command('/main', async (ctx) => {
	ctx.session = {
		airport: '---',
		resort: '---',
		kids: '---',
		persons: '---',
		nigths: '---'
	}
	//при замене значения из модуля на keyboardMain, смешиваются ответы из разных сессий!!
	ctx.session.main = [
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
	await ctx.deleteMessage(ctx.message.message_id);
	await ctx.reply('Заполните форму запроса:', { reply_markup: { inline_keyboard: keyboards.main } });
});

//===================================================================================================
// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
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

	async function output() {
		await ctx.reply('Выберите блок заполнения', { reply_markup: { inline_keyboard: ctx.session.main } }).catch((error) => console.log(error))
	}
	// обработка данных всех подменю
	if (cbData.includes('airport_')) {
		ctx.session.main[0][0].text = 'Город вылета ✔️';
		output();
	};
	if (cbData.includes('resort_')) {
		ctx.session.main[0][1].text = 'Курорт ✔️';
		output();
	};
	if (cbData.includes('persons_')) {
		ctx.session.main[1][0].text = 'Количество взрослых ✔️';
		output();
	};
	if (cbData.includes('kids_')) {
		ctx.session.main[1][1].text = 'Количество детей ✔️';
		output();
	};
	if (cbData.includes('nigths_')) {
		ctx.session.main[2][0].text = 'Количество ночей ✔️';
		output();
	};
})

bot.command('/request', async (ctx) => {
	await request(ctx);
	// const keyboardHotels = await keyboards.hotel()
	// await ctx.reply('Hotels', { reply_markup: { inline_keyboard: keyboardHotels } })
})

const secondsInThirtyMinutes = 60000;
bot.launch()
	.then(async () => {
		await bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...')
			.catch(error => console.log(error));
	})
	.catch(error => console.log(error));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));