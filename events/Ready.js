const { prefix } = require('../exports/values').config
let readyMessage = [{ message: `${prefix}help로 사용법을 제공` }, { message: `getGuildSize개의 서버에서 활동` }, { message: `'너의 이름은'`, type: 'WATCHING' }]

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log('Ready!')
        setInterval(() => {
            if (readyMessage[0].type)
                client.user.setActivity(putVariableString(client, readyMessage[0].message), { type: readyMessage[0].type })
            else client.user.setActivity(putVariableString(client, readyMessage[0].message))

            readyMessage.push(readyMessage[0])
            readyMessage.shift()
        }, 5000)
    }
}

function putVariableString(client, message) {
    return message.replace('getGuildSize', getGuildSize(client))
}

function getGuildSize(client) {
    return client.guilds.cache.size
}