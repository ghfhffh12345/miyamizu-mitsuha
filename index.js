const { config } = require('./exports/values')
const { Client, Intents, Collection} = require('discord.js')
const { token } = config
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"]})

const fs = require('fs')
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
const commandFolders = fs.readdirSync('./commands')
client.commands = new Collection()
client.gameData = new Collection()
client.tgameData = new Collection()

for (const folder of commandFolders) {
    const commandFolders2 = fs.readdirSync(`./commands/${folder}`)
    for (const folder2 of commandFolders2) {
        const commandFiles = fs.readdirSync(`./commands/${folder}/${folder2}`).filter(file => file.endsWith('.js'))
        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${folder2}/${file}`)
            client.commands.set(command.data.name, command)
        }
    }
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if ( event.once ) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.login(token)