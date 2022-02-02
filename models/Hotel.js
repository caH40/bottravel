const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
	name: { type: String },
	airport: { type: String },
	resort: { type: String },
	night: { type: Number },
	persons: { type: Number },
	date: { type: String },
	prices: { type: Array },
	lastUpdate: { type: String }
});

module.exports = model('hotels', hotelSchema);