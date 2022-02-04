const puppeteer = require('puppeteer');

const updateHotels = require('./update-hotels')

async function parse(url) {
	try {
		const browser = await puppeteer.launch();
		// const browser = await puppeteer.launch({ headless: false, slowMo: 200, devtools: true });
		const page = await browser.newPage();
		await page.setViewport({ width: 1200, height: 3000, deviceScaleFactor: 1 });
		await page.goto(url)
		await page.waitForTimeout(4000);

		const resultArr = await page.evaluate(async () => {
			let result = [];
			const selector = '.hotels-list-item';
			//получаем массив из отелей
			const thead = await document.querySelectorAll(selector);
			thead.forEach(element => {
				const selectorHotelName = 'div > div > div > div:nth-child(2) > div > div:nth-child(2) > a > span';
				let name = element.querySelector(selectorHotelName).innerText;

				const selectorHotelPrice = 'div > div > div > div:nth-child(2) > div > div:nth-child(5) > div> div > a > span';
				let price = element.querySelector(selectorHotelPrice).innerText;

				const selectorHotelInfo = 'div > div > div > div:nth-child(2) > div > div:nth-child(5) > div > div:nth-child(2) > div > div ';
				let info = element.querySelector(selectorHotelInfo).innerText;

				result.push({ name, price, info })
			})
			return result;
		});
		await updateHotels(resultArr, url);
		await browser.close();
		// return resultArr;
	} catch (error) {
		console.log(error)
	}
}

module.exports = parse;