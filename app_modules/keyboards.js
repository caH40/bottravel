const getHotelName = require('./fromdb');

const main = [
	[
		{ text: 'Город вылета', callback_data: 'airport' },
		{ text: 'Курорт', callback_data: 'resort' }
	],
	[
		{ text: 'Количество взрослых', callback_data: 'persons' },
		{ text: 'Количество детей', callback_data: 'kids' }
	],
	[
		{ text: 'Количество ночей', callback_data: 'nigths' }
	],
	[
		{ text: 'Отправить запрос на обработку', callback_data: 'sendRequest' }
	]
];
const airport = [
	[
		{ text: 'Минеральные Воды', callback_data: 'airport_Mineralnye.Vody' },
		{ text: 'Москва', callback_data: 'airport_Moscow' }
	]
];
const resort = [
	[
		{ text: 'Аланья', callback_data: 'resort_Alanya' }
	]
];
const persons = [
	[
		{ text: '1 взрослый', callback_data: 'persons_1' },
		{ text: '2 взрослых', callback_data: 'persons_2' }
	],
	[
		{ text: '3 взрослых', callback_data: 'persons_3' },
		{ text: '4 взрослых', callback_data: 'persons_4' }
	]
];
const kids = [
	[
		{ text: 'без детей', callback_data: 'kids_0' },
		{ text: '1 ребенок', callback_data: 'kids_1' }
	],
	[
		{ text: '2 детей', callback_data: 'kids_2' },
		{ text: '3 детей', callback_data: 'kids_.3' }
	]
];
const nights = [
	[
		{ text: '7 ночей', callback_data: 'nigths_7' },
		{ text: '14 ночей', callback_data: 'nigths_14' },

	]
];
async function hotel() {
	const hotelNames = await getHotelName();
	let keysArr = [];
	hotelNames.forEach(element => {
		keysArr.push([{ text: element, callback_data: element }])
	});
	return keysArr;
}

const back = [[{ text: 'Продолжить ввод данных', callback_data: 'edit' }]];




module.exports.main = main;
module.exports.airport = airport;
module.exports.resort = resort;
module.exports.persons = persons;
module.exports.kids = kids;
module.exports.nights = nights;
module.exports.hotel = hotel;
module.exports.back = back;
