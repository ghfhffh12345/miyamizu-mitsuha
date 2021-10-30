const { prefix } = require('../exports/values').config

module.exports = {
    name: "messageCreate",
    execute(message, client) {
        if (message.author.bot) return
        if (message.content == "기미노 나마에와?") return message.reply("미츠하! 나마에와 미츠하!")
        if (message.content.indexOf(prefix) != 0) return

        const commandArgs = message.content.trim().slice(prefix.length).split(' ')
        let command = client.commands.get(commandArgs[0])
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandArgs[0]))

        if (!command) return
        if (command.number_of_elements) {
            if (commandArgs.length < command.number_of_elements) return message.reply(command.data.description)
        }

        try {
            command.execute(message, client, commandArgs)
        } catch (error) {
            message.reply(`에러가 발생했어요! :( => ${error}`)
        }
    }
}
