const fs = require('fs');
const { getFiles } = require('../utils/functions');

module.exports = (bot, reload) => {
    const { client } = bot

    let slashcommands = getFiles('./buttons/', '.js')

    if (slashcommands.length === 0)
        console.log('No buttons loaded')

    slashcommands.forEach(f => {
        if (reload) delete require.cache[require.resolve(`../buttons/${f}`)]
        const button = require(`../buttons/${f}`)
        client.slashcommands.set(button.name, button)
    })
};