const User = require('../../models/User');

async function filters(ctx) {
	const cbData = ctx.update.callback_query.data;
	const userId = ctx.update.callback_query.from.id;
	// обработка инлайн-кнопки 'Показать фильтры отелей'
	try {
		if (cbData === 'requestTracking') {
			const user = await User.findOne({ userId: userId });
			const filter = user.filter;
			//проверка наличия фильтров у юзера
			if (filter[0]) {
				filter.forEach(async element => {
					let airport = element.airport ? `Город вылета: ${element.airport}\n` : '';
					let resort = element.resort ? `Курорт: ${element.resort}\n` : '';
					let night = element.night ? `Количество ночей: ${element.night}\n` : '';
					let persons = element.persons ? `Количество взрослых: ${element.persons}\n` : '';
					let kids = element.kids ? `Количество детей: ${element.kids}\n` : '';
					let hotel = element.hotel ? `Отель: ${element.hotel}\n` : '';
					let message = `${airport}${resort}${persons}${kids}${night}${hotel}`;
					await ctx.reply(message);
				})
			} else {
				await ctx.reply('У Вас нет актуальных фильтров, Вы не отслеживаете изменение цен.');
			}
		}
	} catch (error) {
		console.log(error);
	}
	// обработка инлайн-кнопки 'Удалить фильтры отелей'
	try {
		if (cbData === 'deleteTracking') {
			const user = await User.findOne({ userId: userId });
			const filter = user.filter;
			//проверка наличия фильтров у юзера
			let keyboardFilter = [];
			if (filter[0]) {
				for (let i = 0; i < filter.length; i++) {
					let airport = filter[i].airport ? `${filter[i].airport},` : '';
					let resort = filter[i].resort ? `${filter[i].resort},` : '';
					let night = filter[i].night ? `night: ${filter[i].night},` : '';
					let persons = filter[i].persons ? `adult: ${filter[i].persons},` : '';
					let kids = filter[i].kids ? `kid: ${filter[i].kids},` : '';
					let hotel = filter[i].hotel ? `hotel: ${filter[i].hotel},` : '';
					let message = `${airport}${resort}${persons}${kids}${night}${hotel}`;
					keyboardFilter.push([{ text: message, callback_data: `filter_${i}` }])
				}
				await ctx.reply('Выберите фильтр для удаления:', { reply_markup: { inline_keyboard: keyboardFilter } })
			} else {
				await ctx.reply('У Вас нет актуальных фильтров, Вы не отслеживаете изменение цен.');
			}
		}
	} catch (error) {
		console.log(error);
	}
	// обработка удаления фильтров из документа User, коллекции users
	try {
		if (cbData.includes('filter_')) {
			// извлекаем номер индекса в массиве из cbData
			const filterIndex = Number(cbData.split('filter_').join(''));
			const user = await User.findOne({ userId: userId });
			const filter = user.filter;
			let filterNew;
			//проверка наличия фильтров у юзера
			if (filter[0]) {
				filterNew = filter.filter((element, index) => index !== filterIndex);
				await User.findOneAndUpdate({ userId: userId }, { $set: { filter: filterNew } })
					.then(() => { ctx.reply('Фильтр удален!') })
			}
		}
	} catch (error) {
		console.log(error);
	}

}

module.exports = filters;