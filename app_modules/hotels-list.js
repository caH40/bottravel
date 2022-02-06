const Hotel = require('../models/Hotel')

async function hotelsList(ctx, filters) {
	try {
		let filterIndex = 0;
		filters.forEach(async filter => {
			const hotels = await Hotel.find(filter);
			//проверка наличия документов в коллекции hotels
			if (hotels[0]) {
				filterIndex++;
				let hotelsFiltered = '';
				let hotelsSorted = hotels.sort((a, b) => a.prices[a.prices.length - 1].price - b.prices[b.prices.length - 1].price);
				// определение количества отелей в списке результата поиска - iteration
				let iteration;
				if (hotelsSorted.length < 15) {
					iteration = hotelsSorted.length
				} else {
					iteration = 15
				}
				//формирование списка отелей для сообщения в телеграм
				for (let i = 0; i < iteration; i++) {
					const nameHotel = hotelsSorted[i].hotel;
					const nameUrl = hotelsSorted[i].url;
					const nameDate = hotelsSorted[i].date;
					const nameNight = hotelsSorted[i].night;
					const nameAirport = hotelsSorted[i].airport;
					const namePrice = hotelsSorted[i].prices[hotelsSorted[i].prices.length - 1].price;
					hotelsFiltered = `${hotelsFiltered}${namePrice}р, ${nameDate},  ${nameNight} ночей, ${nameAirport}, <a href="${nameUrl}">${nameHotel.match(/.{1,20}/)}</a>\n`
				}
				const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
				await ctx.reply(`Фильтр №${filterIndex}\n${hotelsFiltered}`, htmlDisPrev);

			} else {
				await ctx.reply('Что то пошло не так, база данных пустая...');
			}
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = hotelsList;