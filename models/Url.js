const { Schema, model } = require('mongoose');

const urlSchema = new Schema({
	url: { type: String },
	lastUpdate: { type: String }
});

module.exports = model('urls', urlSchema);