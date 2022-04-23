import Discord, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES'
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', (message) => {
    if (message.content === 'Hi') {
        message.reply('Hello World')
    }
})

client.login(process.env.TOKEN);