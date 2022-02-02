const User = require('../models/User');
//добавление пользователей запросов (телеграмм)
async function addUser(hotelsId, ctx) {
	let user = await User.findOne({ userId: ctx.update.callback_query.from.id });
	let userNew;
	if (user) {
		user.trackId.forEach(element => hotelsId.push(element));
		await User.findOneAndUpdate({ _id: user._id }, { $set: { trackId: hotelsId } })
	} else {
		userNew = await User({
			userName: ctx.update.callback_query.from.username,
			userId: ctx.update.callback_query.from.id,
			trackId: hotelsId
		})
		await userNew.save().then(console.log('added user to database...'));
	}
}

module.exports = addUser;