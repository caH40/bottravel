const main = [
	[
		{ text: 'Город вылета', callback_data: 'airport' },
		{ text: 'Курорт', callback_data: 'resort' }
	],
	[
		{ text: 'Планируемый месяц', callback_data: 'month' },
		{ text: 'Количество человек', callback_data: 'persons' }

	],
	[
		{ text: 'Количество ночей', callback_data: 'nigths' }
	],
	[
		{ text: 'Изменить данные', callback_data: 'edit' }
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
const month = [
	[
		{ text: 'Март', callback_data: 'month_.03.2022' },
		{ text: 'Апрель', callback_data: 'month_.04.2022' }
	],
	[
		{ text: 'Май', callback_data: 'month_.05.2022' },
		{ text: 'Июнь', callback_data: 'month_.06.2022' }
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
const nights = [
	[
		{ text: '7 ночей', callback_data: 'nigths_7' },
		{ text: '8 ночей', callback_data: 'nigths_8' },
		{ text: '9 ночей', callback_data: 'nigths_9' }
	],
	[
		{ text: '10 ночей', callback_data: 'nigths_10' },
		{ text: '11 ночей', callback_data: 'nigths_11' },
		{ text: '12 ночей', callback_data: 'nigths_12' }
	]
];

const back = [[{ text: 'Продолжить ввод данных', callback_data: 'edit' }]];




module.exports.main = main;
module.exports.airport = airport;
module.exports.resort = resort;
module.exports.month = month;
module.exports.persons = persons;
module.exports.nights = nights;
module.exports.back = back;
