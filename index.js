import Discord, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

import { generateImage } from './generateimage.js';

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS'
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

const weclomeChannelId = "862519578671185941";

client.on("guildMemberAdd", async (member) => {
    const image = await generateImage(member)
    member.guild.channels.cache.get(weclomeChannelId).send({
        content: (`<@${member.id}> Welcome to the server!`),
        files: [image]
    })

})

client.login(process.env.TOKEN);