const start = `
При нажатии "/" вызываются команды бота!
Или воспользуйтесь /help
`
const commands =
	`
/help - помощь
/main - главное меню
/changes - опрос изменений цен
/description - описание сервиса
/delete - удаление
`;


const description = '';
const messageNeedUsername = 'Что бы воспользоваться сервисом необходимо заполнить "username" в настройках своего профиля телеграм.';

module.exports.start = start
module.exports.commands = commands
module.exports.description = description
module.exports.messageNeedUsername = messageNeedUsername