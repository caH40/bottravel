const start = `
При нажатии "/" вызываются команды бота!
Или воспользуйтесь /help
`
const commands =
	`
/help - помощь
/main - главное меню
/description - описание сервиса
`;

const description = `<b>"Показать список отелей"</b> - Это Ваш список отелей по которым будет производиться мониторинг цен, при снижении цены будет приходить соответствующее оповещение в телеграм. Показываются первые 15 результатов, или меньше.\n<b>"Добавить фильтры отелей"</b> - Добавление фильтра поиска отелей в Ваш список.\n<b>"Показать фильтры отелей"</b> - Показывает все Ваши фильтры поиска отелей по которым мониторятся цены.\n<b>"Удалить фильтры отелей"</b> - Удаление отелей из Вашего списка.\n<b>"Добавление поиска отелей в БД"</b> -Первоначально добавляется поиск отелей по фильтрам в локальную базу данных, эти данные будут обновляться каждые 20 минут.`;

const messageNeedUsername = 'Что бы воспользоваться сервисом необходимо заполнить "username" в настройках своего профиля телеграм.';

module.exports.start = start
module.exports.commands = commands
module.exports.description = description
module.exports.messageNeedUsername = messageNeedUsername