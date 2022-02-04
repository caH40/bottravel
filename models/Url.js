const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
	url: { type: String, unique: true, required: true },
	lastUpdate: { type: String }
});

module.exports = model('urls', urlSchema);