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
					elementFilter.updated = true;
					// console.log(elementFilter)
					let hotels = await Hotel.find(elementFilter); //массив из отелей
					let hotelsFiltered = '';
					for (let i = 0; i < hotels.length; i++) {
						await Hotel.findOneAndUpdate({ _id: hotels[i]._id }, { $set: { updated: false } });
						let nameHotel = hotels[i].hotel;
						let nameUrl = hotels[i].url;
						let namePrice = hotels[i].prices[hotels[i].prices.length - 1].price;
						let nameDate = hotels[i].date.split('.2022').join('');
						let nameNight = hotels[i].night;
						let nameAirport = hotels[i].airport;
						let priceLast = hotels[i].prices[hotels[i].prices.length - 1].price;
						// console.log(priceLast);
						//!! Фильтр по цене, не больше 30тр, выставляется вручную
						const priceNoMore = 60000;
						//проверка, чтобы количество элементов массива цен было 2 и более
						if (hotels[i].prices.length > 1 && priceLast < priceNoMore) {
							let pricePreLast = hotels[i].prices[hotels[i].prices.length - 2].price;
							let result = priceLast - pricePreLast;
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