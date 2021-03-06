require('dotenv').config();
const mongoose = require('mongoose');

const Url = require('./models/Url');
const parse = require('./parse/parse');

// подключение к базе данных
mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..');
	})
	.catch((error) => {
		console.log(error);
	});

const millisecondsInTenSecond = 20000;
const millisecondsInThirtyMinutes = 1800000;

async function updateDb() {
	try {
		const urls = await Url.find();
		let i = 0;
		urls.forEach(element => {
			i++
			setTimeout(async () => {
				console.log(`${new Date().toLocaleString()}- i=${i} ${element.url}`)
				await parse(element.url);
			}, millisecondsInTenSecond * i);
		})
	} catch (error) {
		console.log(error)
	}
}

setInterval(() => {
	updateDb()
}, millisecondsInThirtyMinutes);