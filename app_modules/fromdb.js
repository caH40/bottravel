const Hotel = require('../models/Hotel');

async function getHotelName() {
	const hotels = await Hotel.find();
	let hotelNames = [];
	hotels.forEach(element => {
		if (hotelNames.includes(element.name)) {
			//если есть отель в массиве, то пропускаем
		} else {
			hotelNames.push(element.name);
		}
	})
	return hotelNames
}


module.exports = getHotelName;