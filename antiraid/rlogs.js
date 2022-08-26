const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const config = require("../config")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const footer = config.app.footer


module.exports = {
    name: 'raidlog',
    usage: 'raidlog <id>',
    description: `Permet de changer le salon des logs de raid.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}.${message.guild.id}`) || message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (db.get(`${message.guild.id}.raidlog`) === newChannel) return message.channel.send(`<:ModoDiscord:959184555531698186>・__Nouveau salon des logs de raid :__ \`${db.get(`${message.guild.id}.raidlog`)}\``)
            else {
                db.set(`${message.guild.id}.raidlog`, newChannel.id)
                message.channel.send(`<:ModoDiscord:959184555531698186>・__Nouveau salon des logs de raid :__ ${args[0]}`)

                const logs = db.get(`${message.guild.id}.raidlog`)

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} à défini ce salon commme salon des logs de raid`)
                    .setDescription(`<:ModoDiscord:959184555531698186> Ce salon est désormais utilisé pour __toutes__ les **logs de raid** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `${footer}` })
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
            }
        }
    }
}