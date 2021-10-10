const { SlashCommandBuilder } = require('@discordjs/builders')
const { Tetris } = require('../../../exports/Tetris')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tetris'),
    description: '[Command] => 테트리스 게임을 시작합니다.',
    aliases: ['t'],
    execute(message, client, commandArgs) {
        const tetris = new Tetris({ userId: message.author.id })
        message.reply(tetris.gameDataRendering())
    }
}