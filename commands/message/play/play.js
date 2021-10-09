const { SlashCommandBuilder } = require('@discordjs/builders')
const { Omok } = require('../../../exports/Omok')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('[Command] => 오목 게임을 시작합니다.'),
    aliases: ['t'],
    execute(message, client, commandArgs) {
        commandArgs.shift()

        if (commandArgs[0] != 'end') {
            let OmokData

            if (!client.gameData.has(message.channel.id)) {
                OmokData = new Omok()
                OmokData.setUsersData(message.author.id, commandArgs[0].substring(3, commandArgs[0].length - 1))
            } else {
                OmokData = new Omok(client.gameData.get(message.channel.id))
                OmokData.pushData(message.author.id, parseInt(commandArgs[0], 10), parseInt(commandArgs[1], 10))
            }

            client.gameData.set(message.channel.id, OmokData.getGames())
            message.channel.send(OmokData.gameDataRendering())

            if (OmokData.cheakGameOver()) {
                return this.execute(message, client, [null, 'end'])
            }
        } else {
            client.gameData.delete(message.channel.id)
            message.reply('이 채널의 게임판을 종료했습니다.')
        }
    }
}