const { SlashCommandBuilder } = require('@discordjs/builders')
const { Omok } = require('../../../exports/Omok')
const description = [
    '[Command] [Author User Mention] => 해당 채널에 오목 게임을 시작합니다.',
    '[Command] [Line] [Number] => 해당 채널의 오목 게임 참가자라면,',
    '이 명령어로 오목을 둘 수 있습니다.',
    '[Command] end => 해당 채널의 오목 게임을 종료합니다.'
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play'),
    description: description.join('\n'),
    aliases: ['t', 'paly'],
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