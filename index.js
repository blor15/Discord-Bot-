const Discord = require('discord.js');
require('dotenv').config();

// const generateImage = require('./generateimage');


const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_MEMBERS'
    ]
});

let bot = {
    client,
    prefix: 'n.',
    owners: ['295308558021427201']
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot;


// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`)
// });

// client.on('messageCreate', (message) => {
//     if (message.content === 'Hi') {
//         message.reply('Hello World')
//     }
//     if (message.content === 'Ching') {
//         message.reply('Shut Up')
//     }
// })

// const weclomeChannelId = "862519578671185941";

// client.on("guildMemberAdd", async (member) => {
//     const image = await generateImage(member)
//     member.guild.channels.cache.get(weclomeChannelId).send({
//         content: (`<@${member.id}> Welcome to the server!`),
//         files: [image]
//     })

// })

client.login(process.env.TOKEN);

