const puppeteer = require('puppeteer');

const updateHotels = require('./update-hotels')

async function parse(url) {
	try {
		const resortUrl = url.match(/to-(.*)-TR/)[1];
		const resortTranslator = { Alanya: 'Алания' };

		const browser = await puppeteer.launch();
		// const browser = await puppeteer.launch({ headless: false, slowMo: 200, devtools: true });
		const page = await browser.newPage();
		await page.setViewport({ width: 900, height: 3000, deviceScaleFactor: 1 });
		await page.goto(url)
		await page.waitForTimeout(4000);

		const resultArr = await page.evaluate(async () => {
			let result = [];
			const selector = '.hotels-list-item';
			//получаем массив из отелей
			const thead = await document.querySelectorAll(selector);
			thead.forEach(element => {
				const selectorHotelName = 'div > div > div > div:nth-child(2) > div > div:nth-child(2) > a > span';
				let hotelNameFromParse = element.querySelector(selectorHotelName).innerText;

				const selectorHotelPrice = 'div > div > div > div:nth-child(2) > div > div:nth-child(5) > div> div > a > span';
				let price = element.querySelector(selectorHotelPrice).innerText;

				const selectorHotelResort = 'div > div > div > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div';
				let resort = element.querySelector(selectorHotelResort).innerText;

				// const selectorHotelInfo = 'div > div > div > div:nth-child(2) > div > div:nth-child(5) > div > div:nth-child(2) > div > div ';
				// let info = element.querySelector(selectorHotelInfo).innerText;
				result.push({ hotelNameFromParse, price, resort })
			})
			return result;
		});
		const resultArrFiltered = resultArr.filter(element => element.resort.includes(resortTranslator[resortUrl]))
		await updateHotels(resultArrFiltered, url);
		await browser.close();
	} catch (error) {
		console.log(error)
	}
}

module.exports = parse;