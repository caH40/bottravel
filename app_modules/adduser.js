const User = require('../models/User');
//добавление пользователей запросов (телеграмм)
async function addUser(ctx, userId, filter) {
	const user = await User.findOne({ userId: userId });
	//проверка существования user
	if (user) {
		let filterForUser = user.filter;
		filterForUser.push(filter);
		await User.findOneAndUpdate({ userId: userId }, { $set: { filter: filterForUser } })
	} else {
		const userNew = await User({
			userName: ctx.update.callback_query.from.username,
			userId: userId,
			filter: filter
		})
		await userNew.save().then(console.log('added user to database...'))
	}

}

module.exports = addUser;