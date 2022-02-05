// проверяем существует ли юзер, если да, то добавляем в trackId новый _id Hotel для отслеживания
const user = await User.findOne({ userId: ctx.update.callback_query.from.id });
if (user) {
	let trackId = user.trackId; // должен быть массив у существующего юзера
	// исключаем дублирование _id
	if (!trackId.includes(hotel._id)) {
		trackId.push(hotel._id)
		await User.findOneAndUpdate({ userId: ctx.update.callback_query.from.id }, { $set: { trackId: trackId } });
	}
}