const { SlashCommandBuilder } = require('@discordjs/builders')
const { Collection } = require('discord.js')
const { gameRendering } = require('../../../exports/function')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tplay')
        .setDescription('[Command] => 테트리스 게임을 시작합니다.'),
    aliases: ['tp'],
    execute(message, client, commandArgs) {
        if (!client.tgameData.has(message.author.id)) {
            client.tgameData.set(message.author.id, [
                [], [], [], [], [], [], [], [], [], [], []
            ])
        }
    }
}