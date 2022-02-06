const User = require('../models/User');
const Hotel = require('../models/Hotel');

async function trackingChanges(bot) {
	try {
		const users = await User.find();
		if (users) {
			users.forEach(async elementUser => {
				let userId = elementUser.userId;
				let filters = elementUser.filter; // filters может быть  пустой массив []
				filters.forEach(async elementFilter => {
					let hotels = await Hotel.find(elementFilter); //массив из отелей
					let hotelsFiltered = '';
					for (let i = 0; i < hotels.length; i++) {
						const nameHotel = hotels[i].hotel;
						const nameUrl = hotels[i].url;
						const namePrice = hotels[i].prices[hotels[i].prices.length - 1].price;
						const nameDate = hotels[i].date.split('.2022').join('');
						const nameNight = hotels[i].night;
						const nameAirport = hotels[i].airport;
						const priceLast = hotels[i].prices[hotels[i].prices.length - 1]
						const pricePreLast = hotels[i].prices[hotels[i].prices.length - 2]
						console.log(priceLast)
						//!! Фильтр по цене, не больше 30тр, выставляется вручную
						const priceNoMore = 30000;
						if (hotels[i].prices.length > 1 && priceLast < priceNoMore) {
							const result = priceLast - pricePreLast;
							if (result < 0) {
								hotelsFiltered = `${hotelsFiltered}${result}р, ${namePrice}р, ${nameDate},  ${nameNight} ночей, ${nameAirport}, <a href="${nameUrl}">${nameHotel.match(/.{1,20}/)}</a>\n`
							}
						}
					}
					const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
					if (hotelsFiltered != '') {
						await bot.telegram.sendMessage(userId, `Список отелей, где снижались цены!\n${hotelsFiltered}`, htmlDisPrev);
					}
				})
			})
		} else {
			console.log('Нет ни одного user');
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = trackingChanges;