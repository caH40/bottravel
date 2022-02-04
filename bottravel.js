require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');

const text = require('./app_modules/text');
const getHotelName = require('./app_modules/fromdb');
const keyboards = require('./app_modules/keyboards');
const request = require('./app_modules/request');
const handlerMain = require('./app_modules/menu/handler-main');



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
	await handlerMain(ctx)
})

bot.command('/request', async (ctx) => {
	await request();
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