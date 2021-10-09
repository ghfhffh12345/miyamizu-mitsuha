const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const FolderList = fs.readdirSync('./commands/message')

const description = '[Command] => 미츠하 사용법이 있는 폴더 목록을 알려줍니다.\n또는 [Command] [Folder Name] => 해당 폴더 안에 있는 명령어 사용법을 알려줍니다.'
const FolderListEmbed = new MessageEmbed()
    .setTitle('미츠하 help')
    .setDescription(description)
    .addField('\u200B', FolderList.join('\n'))
    .setTimestamp()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help'),
    description,
    aliases: ['h'],
    execute(message, client, commandArgs) {
        if (commandArgs.length < 2) {
            message.reply({ embeds: [FolderListEmbed] })
        }
    }
}