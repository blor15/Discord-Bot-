const Discord = require('discord.js');
require('dotenv').config();

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
    owners: [process.env.ownerID]
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.buttons = new Discord.Collection();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);
client.loadButtons = (bot, reload) => require('./handlers/buttons')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashCommands(bot, false);
client.loadButtons(bot, false);

module.exports = bot;

//Welcome function for new member in the server
const generateImage = require('./generateimage');

client.on("guildMemberAdd", async (member) => {
    const image = await generateImage(member)
    member.guild.channels.cache.get(process.env.welcomeChannelID).send({
        content: (`<@${member.id}> Welcome to the server!`),
        files: [image]
    })

})

client.login(process.env.TOKEN);

