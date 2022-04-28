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
client.slashcommands = new Discord.Collection();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);
client.loadSlashCommands = (bot, reload) => require('./handlers/slashcommands')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashCommands(bot, false);

module.exports = bot;

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply('This command can only be used in a server')

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply('Invalid slash command')

    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply('You do not have permission for this command')

    slashcmd.run(client, interaction)
})


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

