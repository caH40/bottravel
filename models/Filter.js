const { Schema, model } = require('mongoose');

const filterSchema = new Schema({
	hotel: { type: String },
	airport: { type: String },
	resort: { type: String },
	night: { type: Number },
	persons: { type: Number },
	kids: { type: Number },
	lastUpdate: { type: String }
});

module.exports = model('filters', filterSchema);