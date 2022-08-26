const ms = require('ms')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const config = require("../config")
const color = config.app.color
const footer = config.app.footer

module.exports = {
    name: 'ping',

    async execute(client, message, args) {

        const embed = new Discord.MessageEmbed()
        embed.addField('BOT', client.ws.ping + 'ms', true)
        embed.setColor()
        message.channel.send({ embeds: [embed] }).then(async msg => {
            embed.addField("API", msg.createdTimestamp - message.createdTimestamp + 'ms', true)
            msg.edit({ embeds: [embed] })
        })
    }
}