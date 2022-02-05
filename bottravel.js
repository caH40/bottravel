require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');

const text = require('./app_modules/text');
const getHotelName = require('./app_modules/keyboard-hotels');
const keyboards = require('./app_modules/keyboards');
const tracking = require('./app_modules/request');
const handlerSearch = require('./app_modules/menu/handler-search');
const handlerTracking = require('./app_modules/menu/handler-tracking');

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
	ctx.session = {};
	await ctx.deleteMessage(ctx.update.message.message_id).catch(error => console.log(error));
	await ctx.reply('Заполните форму:', { reply_markup: { inline_keyboard: keyboards.start } });
});

// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
	await ctx.deleteMessage(ctx.update.callback_query.message.message_id).catch(error => console.log(error));
	// console.log(ctx.update.callback_query);
	// console.log(ctx.session.tracking);
	await handlerSearch(ctx).catch(error => console.log(error));
	await handlerTracking(ctx).catch(error => console.log(error));
})




bot.launch()
	.then(async () => {
		await bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...')
			.catch(error => console.log(error));
	})
	.catch(error => console.log(error));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));