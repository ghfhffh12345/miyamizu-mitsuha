const { SlashCommandBuilder } = require('@discordjs/builders')
const { Collection } = require('discord.js')
const { gameRendering } = require('../../../exports/function')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('[Command] [other user id] => 오목 게임을 시작합니다.'),
    aliases: ['p', 'play'],
    number_of_elements: 2,
    execute(message, client, commandArgs) {
        let gameData = client.gameData.get(message.channel.id)

        commandArgs.shift()

        if (commandArgs[0] != 'end') {
            if (!client.gameData.has(message.channel.id)) {
                client.gameData.set(message.channel.id, {
                    players: [{ id: message.author.id, color: 'blue' }, { id: commandArgs[0].substring(3, commandArgs[0].length - 1), color: 'red' }],
                    games: [[], [], [], [], [], [], [], [], [], []]
                })
                gameData = client.gameData.get(message.channel.id)
            } else {
                if (gameData.players[0].id == message.author.id) {
                    if ((commandArgs[0] > 0 && commandArgs[0] <= 10) || (commandArgs[1] > 0 && commandArgs[1] <= 10)) {
                        gameData.games[parseInt(commandArgs[0], 10) - 1].push({ number: parseInt(commandArgs[1], 10), color: gameData.players[0].color })
                        gameData.players.push(gameData.players[0])
                        gameData.players.shift()
                    }
                } else {
                    return message.reply(`${message.author.username}님은 게임에 참가하지 못했어요!`)
                }
            }
            console.log(gameData.games)
            message.reply(`<@${gameData.players[0].id}>\n` + gameRendering(gameData.games))
        } else {
            client.gameData.delete(message.channel.id)
            message.reply('이 채널의 게임판을 종료했습니다.')
        }
    }
}