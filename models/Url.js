const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
	url: { type: String, unique: true, required: true },
	date: { type: Number },
	lastUpdate: { type: String }
});

module.exports = model('urls', urlSchema);