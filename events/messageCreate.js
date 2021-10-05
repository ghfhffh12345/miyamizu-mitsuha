const { prefix } = require('../exports/values').config

module.exports = {
    name: "messageCreate",
    execute(message, client) {
        if (message.author.bot) return
        if (message.content.indexOf(prefix) != 0) return

        const commandArgs = message.content.trim().slice(prefix.length).split(' ')
        let command = client.commands.get(commandArgs[0])
            || client.commands.find(cmd => cmd.command.aliases && cmd.command.aliases.includes(commandArgs[0]))

        if (!command) {
            if (client.gameData.has(message.channel.id)) {
                
            }
        } else {
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
}
