const { Schema, model } = require('mongoose');

const hotelSchema = new Schema({
	hotel: { type: String },
	url: { type: String },
	airport: { type: String },
	resort: { type: String },
	night: { type: Number },
	persons: { type: Number },
	kids: { type: Number },
	date: { type: String },
	prices: { type: Array },
	updated: { type: Boolean },
	lastUpdate: { type: String }
});

module.exports = model('hotels', hotelSchema);