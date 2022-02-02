const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	userName: { type: String, unique: true, require: true },//username из телеграм
	userId: { type: Number, unique: true, require: true }, //id из телеграм
	trackId: { type: Array } //записываются id документов из Hotel, отслеживаемые отели юзером
});

module.exports = model('users', userSchema);