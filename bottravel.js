require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');

const text = require('./app_modules/text');
const keyboards = require('./app_modules/keyboards');
const handlerSearch = require('./app_modules/menu/handler-search');
const handlerTracking = require('./app_modules/menu/handler-tracking');
const filters = require('./app_modules/menu/filters');
const trackingList = require('./app_modules/tracking-list');
const trackingChanges = require('./app_modules/tracking-changes');

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

const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
const millisecondsInTenMinutes = 60000;

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
	try {
		const userName = ctx.update.message.from.username;
		if (userName) {
			ctx.session = {};
			await ctx.deleteMessage(ctx.update.message.message_id).catch(error => console.log(error));
			await ctx.reply('Заполните форму:', { reply_markup: { inline_keyboard: keyboards.start } });
		} else {
			await ctx.deleteMessage(ctx.update.message.message_id).catch(error => console.log(error));
			await ctx.reply(text.messageNeedUsername);
		}
	} catch (error) {
		console.log(error)
	}

});
bot.command('/description', async (ctx) => {
	await ctx.deleteMessage(ctx.update.message.message_id).catch(error => console.log(error));
	await ctx.reply(text.description, { parse_mode: 'html' });
});

// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
	await ctx.deleteMessage(ctx.update.callback_query.message.message_id).catch(error => console.log(error));
	await handlerSearch(ctx).catch(error => console.log(error));
	await handlerTracking(ctx).catch(error => console.log(error));
	await filters(ctx).catch(error => console.log(error));
	await trackingList(ctx).catch(error => console.log(error));
})




bot.launch()
	.then(async () => {
		await bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...')
			.catch(error => console.log(error));
	})
	.then(async () => {
		setInterval(async () => {
			await trackingChanges(bot);
		}, millisecondsInTenMinutes)
	})
	.catch(error => console.log(error));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));