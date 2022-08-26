const Discord = require("discord.js")
const db = require('quick.db')
const p = new db.table("prefix")
const owner = new db.table("Owner")
const config = require("../config")
const color = config.app.color

module.exports = {
    name: 'prefix',
    usage: 'prefix',
    description: `Permet de changer le prefix du bot sur un serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}.${message.guild.id}`) || message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id) === true) {

            const newprefix = args[0]

            if (!newprefix) return message.reply("Merci d'indiquer le prefix que vous souhaitez")

            if (newprefix.length > 5) return message.reply("Merci de choisir un prefix qui contient maximum 5 carractère")

            message.channel.send(`Mon est prefix sur le serveur est désormais \`${newprefix}\``)
            p.set(`prefix_${message.guild.id}`, newprefix)

        }
    }
}