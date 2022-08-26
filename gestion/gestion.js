const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const config = require("../config")
const p = new db.table("prefix")
const footer = config.app.footer

module.exports = {
    name: 'gestion',
    usage: 'gestion',
    description: `Permet d'afficher toutes les commandes de gestions`,
    async execute(client, message, args) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        const Embed = new Discord.MessageEmbed()
            .setTitle(`Gestion Permissions`)
            .setDescription(`Prefix actuel : \`${pf}\``)
            .addField(`\`pall\` : `, `Désactive toutes les permissions du serveur à tous les roles`)
            .addField(`\`padmin\` : `, `Désactive toutes les permissions administrateur du serveur`)
            .addField(`\`prole\` : `, `Désactive toutes les permissions roles du serveur`)
            .addField(`\`pkick\` : `, `Désactive toutes les permissions kick du serveur`)
            .addField(`\`pban\` : `, ` Désactive toutes les permissions ban du serveur`)
            .addField(`\`pmoove\` : `, ` Désactive toutes les permissions moove du serveur`)
            .addField(`\`pwebhooks\` : `, `Désactive toutes les permissions créer des webhooks du serveur`)
            .addField(`\`pmute\` : `, `Désactive toutes les permissions mute du serveur`)
            .addField(`\`pviewc\` : `, `Désactive toutes les permissions voir les salons du serveur`)
            .addField(`\`pserver\` : `, `Désactive toutes les permissions gérer le serveur`)
            .setFooter({ text: `${footer}` })
            .setColor(color)
        message.channel.send({ embeds: [Embed] })
    }
}