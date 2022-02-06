const User = require('../models/User');
//добавление пользователей запросов (телеграмм)
async function addUser(ctx, userId, filter) {
	try {
		const user = await User.findOne({ userId: userId });
		//проверка существования user
		if (user) {
			let filterForUser = user.filter;
			filterForUser.push(filter);
			await User.findOneAndUpdate({ userId: userId }, { $set: { filter: filterForUser } })
				.then(await ctx.reply('Фильтр добавлен.'))
				.catch(error => console.log('Ошибка в обновлении User' + error))
		} else {
			const userNew = await User({
				userName: ctx.update.callback_query.from.username,
				userId: userId,
				filter: filter
			})
			await userNew.save()
				.then(await ctx.reply('Фильтр добавлен.'))
				.then(console.log('added user to database...'))
				.catch(error => console.log('Ошибка в добавлении нового User' + error))
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = addUser;