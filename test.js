// const n = 3;
// const str1 = n.toString();

// console.log(str1.padStart(2, '0'));

// const url = 'https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-31.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc';

// const result = url.match(/()/)

// console.log(result);


// const day = new Date().getDate();
// const month = new Date().getMonth() + 1;


// console.log(day, month);


// const parse = require('./parse/parse');

// const url = 'https://level.travel/search/Mineralnye.Vody-RU-to-Alanya-TR-departure-08.02.2022-for-7-nights-1-adults-0-kids-1..5-stars?sort_by=price,asc'
// parse(url)


//сортировка названий

// const hotels = [
// 	{ name: 'Shumi', price: '800' },
// 	{ name: 'Arsi', price: '100' },
// 	{ name: 'Monart', price: '250' },
// 	{ name: 'Kleopatra', price: '900' },
// 	{ name: 'Siri', price: '300' },
// 	{ name: 'Eloptra', price: '200' },
// ]

// console.log(hotels)
// let hotelsSort = hotels.sort((a, b) => a.name - b.name)

// console.log(hotelsSort)

// session = {
// 	hotelTracking: "checker1",


// }

// const filter = {};
// if (ctx.session.hotelTracking) { filter.name = ctx.session.hotelTracking }
// if (ctx.session.airportTracking) { filter.url = ctx.session.airportTracking }
// if (ctx.session.airportTracking) { filter.airport = ctx.session.airportTracking }
// if (ctx.session.resortTracking) { filter.resort = ctx.session.resortTracking }
// if (ctx.session.nightTracking) { filter.night = ctx.session.nightTracking }
// if (ctx.session.personsTracking) { filter.persons = ctx.session.personsTracking }
// if (ctx.session.kidsTracking) { filter.kids = ctx.session.kidsTracking }

// console.log(filter)

const filter = [
	{
		airport: 'Mineralnye.Vody',
		resort: 'Alanya',
		night: '7',
		persons: '1',
		kids: '0'
	},
	{ hotel: 'Arsi Hotel', night: '14' },
	{ hotel: 'Arsi Hotel', night: '7' }
]



//необходимо удалить 2ой элемент
let filterNew = filter.filter((element, index) =>
	index !== 1
)

console.log(filterNew)