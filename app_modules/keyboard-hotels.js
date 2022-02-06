// запрос наименований отелей из БД
const Hotel = require('../models/Hotel');

async function getKeyboardHotels() {
	const hotels = await Hotel.find();
	let hotelsSort = hotels.sort((a, b) => a.hotel - b.hotel)
	let hotelNames = [];
	hotelsSort.forEach(element => {
		if (hotelNames.includes(element.hotel)) {
			//если есть отель в массиве, то пропускаем
		} else {
			hotelNames.push(element.hotel);
		}
	})
	//создание инлайн клавиатуры
	let keysArr = [];
	hotelNames.forEach(element => {
		keysArr.push([{ text: element, callback_data: `hotelTracking_${element}` }])
	});
	return keysArr;
}


module.exports = getKeyboardHotels;