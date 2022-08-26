const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const config = require("../config")
const cl = new db.table("Color")
const footer = config.app.footer

module.exports = {
    name: 'owner',
    usage: 'owner <list> / <add> / <remove>',
    description: `Permet de gérer les owners du bot.`,
    async execute(client, message, args) {
        
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id)) {

        if (args[0] === "list") {

                let list = message.guild.members.cache.filter(u => owner.get(`owners.${u.id}.${message.guild.id}`) === u.id).map(a => "<@" + a.user.id + ">")

                const embed = new Discord.MessageEmbed()
                    .setTitle("liste des Owners")
                    .setDescription(list.join("\n"))
                    .setColor(color)
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })

        }

                if (args[0] === "add") {

                    let user = message.mentions.users.first()

                    if (!user) return message.channel.send({ content: "Veuillez mentionner le membre que vous souhaitez rendre owner" })

                    if (owner.get(`owners.${user.id}.${message.guild.id}`) === user.id) {
                        return message.channel.send({ content: `__${user.username}__ est déjà owner` })
                    } else {
                        owner.set(`owners.${user.id}.${message.guild.id}`, user.id)
                        message.channel.send({ content: `__${user.username}__ est désormais owner` })
                    }
                }

                if (args[0] === "remove") {


                    let user = message.mentions.users.first()

                    if (!user) return message.channel.send({ content: "Veuillez mentionner le membre que vous souhaitez retirer des owners" })

                    if (!owner.get(`owners.${user.id}.${message.guild.id}`) === user.id) {
                        return message.channel.send({ content: `__${user.username}__ n'est pas owner` })
                    } else {
                        owner.set(`owners.${user.id}.${message.guild.id}`, false)
                        message.channel.send({ content: `__${user.username}__ n'est plus owner` })
                    }
                }
            }
        }
    }
