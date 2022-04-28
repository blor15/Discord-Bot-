const duration = [
    { name: '60 seconds', value: 60 * 1000 },
    { name: '5 minutes', value: 5 * 60 * 1000 },
    { name: '10 minutes', value: 10 * 60 * 1000 }
]
const run = async (client, interaction) => {
    let member = interaction.options.getMember('user')
    let duration = interaction.options.getNumber('duration')
    let reason = interaction.options.getString('reason') || 'No reason given'

    if (!member) return interaction.reply('Invalid member')

    try {
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} has been timed out for ${duration.find(d => duration === d.value)?.name} with a reason of ${reason}`)
    }
    catch (err) {
        if (err) {
            console.error(err)
            return interaction.reply(`Failed to timeout ${member.user.tag}`)
        }
    }
}

module.exports = {
    name: 'timeout',
    description: 'Timeout a member',
    perm: 'MODERATE_MEMBERS',
    options: [
        {
            name: 'user', description: 'The user to timeout',
            type: 'USER', required: true
        },
        {
            name: 'duration',
            description: 'The duration of the timeout',
            type: 'NUMBER',
            choices: duration,
        },
        {
            name: 'reason',
            description: 'Reason for punishment',
            type: 'STRING',
            required: false
        }
    ]
}