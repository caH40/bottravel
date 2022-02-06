const User = require('../models/User');
const hotelsList = require('./hotels-list');

async function trackingList(ctx) {
	try {
		const cbData = ctx.update.callback_query.data;
		const userId = ctx.update.callback_query.from.id;
		if (cbData === 'tracking') {
			let user = await User.findOne({ userId: userId });
			//избавляемся от ошибки, если user = null
			user ??= {};
			//проверка наличия фильтров у user
			if (user.filter) {
				await hotelsList(ctx, user.filter)
			} else {
				await ctx.reply('У Вас нет фильтров для мониторинга цен, выберите пункт меню "Добавить фильтры отелей"')
			}
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = trackingList;



