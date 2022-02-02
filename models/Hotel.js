const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
	name: { type: String },
	night: { type: String },
	date: { type: String },
	prices: { type: Array },
	lastUpdate: { type: String }
});

module.exports = model('hotels', hotelSchema);