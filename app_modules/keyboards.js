const start = [
	[
		{ text: 'Показать список отслеживаемых отелей', callback_data: 'tracking' }
	],
	[
		{ text: 'Добавить список отслеживаемых отелей', callback_data: 'addTracking' }
	],
	[
		{ text: 'Удалить список отслеживаемых отелей', callback_data: 'deleteTracking' }
	],
	[
		{ text: 'Добавление поиска отелей в БД', callback_data: 'search' }
	]
];
// меню второго уровня
const tracking = [
	[
		{ text: 'Город вылета', callback_data: 'airportTrack' },
		{ text: 'Курорт', callback_data: 'resortTrack' }
	],
	[
		{ text: 'Количество взрослых', callback_data: 'personsTrack' },
		{ text: 'Количество детей', callback_data: 'kidsTrack' }
	],
	[
		{ text: 'Количество ночей', callback_data: 'nigthsTrack' },
		{ text: 'Отель', callback_data: 'hotelTrack' }
	],
	[
		{ text: 'Отправить запрос на обработку', callback_data: 'sendRequestTrack' }
	]
];
const search = [
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
// меню третьего уровня
// для search
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
	]
];
const kids = [
	[
		{ text: 'без детей', callback_data: 'kids_0' },
		{ text: '1 ребенок', callback_data: 'kids_1' }
	]
];
const nights = [
	[
		{ text: '7 ночей', callback_data: 'nigths_7' },
		{ text: '14 ночей', callback_data: 'nigths_14' },

	]
];
// для tracking
const airportTracking = [
	[
		{ text: 'Минеральные Воды', callback_data: 'airportTracking_Mineralnye.Vody' },
		{ text: 'Москва', callback_data: 'airportTracking_Moscow' }
	]
];
const resortTracking = [
	[
		{ text: 'Аланья', callback_data: 'resortTracking_Alanya' }
	]
];
const personsTracking = [
	[
		{ text: '1 взрослый', callback_data: 'personsTracking_1' },
		{ text: '2 взрослых', callback_data: 'personsTracking_2' }
	]
];
const kidsTracking = [
	[
		{ text: 'без детей', callback_data: 'kidsTracking_0' },
		{ text: '1 ребенок', callback_data: 'kidsTracking_1' }
	]
];
const nightsTracking = [
	[
		{ text: '7 ночей', callback_data: 'nigthsTracking_7' },
		{ text: '14 ночей', callback_data: 'nigthsTracking_14' },

	]
];
const back = [[{ text: 'Продолжить ввод данных', callback_data: 'edit' }]];


module.exports.start = start;
module.exports.search = search;
module.exports.tracking = tracking;
module.exports.airport = airport;
module.exports.resort = resort;
module.exports.persons = persons;
module.exports.kids = kids;
module.exports.nights = nights;
module.exports.airportTracking = airportTracking;
module.exports.resortTracking = resortTracking;
module.exports.personsTracking = personsTracking;
module.exports.kidsTracking = kidsTracking;
module.exports.nightsTracking = nightsTracking;
module.exports.back = back;