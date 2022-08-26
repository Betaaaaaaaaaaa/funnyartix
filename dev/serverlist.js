const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const color = config.app.color
const footer = config.app.footer

module.exports = {
    name: 'serverlist',
    usage: 'serverlist',
    description: `Permet d'afficher les serveur qui possède le bot.`,
    async execute(client, message, args, color) {

        if (config.app.funny.includes(message.author.id) === true) {

            this.client = message.client;
            let i0 = 0
            let i1 = 10
            let page = 1
            let description =
                `**Nombre de serveurs :** \`${this.client.guilds.cache.size}\`\n\n` +
                this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} \`[${r.memberCount}]\`・ \`(${r.id})\``)
                    .slice(0, 10)
                    .join("\n")
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setFooter({ text: `${footer}` })
                .setDescription(description)
            message.channel.send({ embeds: [embed] })

        }
    }
}