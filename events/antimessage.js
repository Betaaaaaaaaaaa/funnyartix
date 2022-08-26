const db = require("quick.db")
const config = require('../config')
const Discord = require('discord.js')
const p = new db.table("Prefix")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const linksall = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg',
    'discord.me',
    'discord.io',
    'invite.me',
    'discordapp.com/invite'
]

const mention = ["@everyone", "@here"]

module.exports = {
    name: "messageCreate",

    async execute(client, message, channel) {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color
        let isLinkall = false
        let isMention = false
        let antilinkall = await db.get(`config.${message.guild.id}.antilink`)
        let antieveryone = await db.get(`config.${message.guild.id}.antieveryone`)

        linksall.forEach(l => {
            if (message.content.includes(l)) {
                isLinkall = true
            }
        })

        mention.forEach(l => {
            if (message.content.includes(l)) {
                isMention = true
            }
        })

        if (message.author.bot) return
        if (message.channel.type == "DM") return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        if (owner.get(`owners.${message.member.id}.${message.guild.id}`) || config.app.funny === message.author.id === true) return

        if (antilinkall == true) {

            if (isLinkall == true) {
                message.delete()
                message.member.timeout(15000)
                message.channel.send({ content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.` }).then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })


                const embed = new Discord.MessageEmbed()
                   .setColor(color)
                .setDescription(`<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`)
                    .setTimestamp()
                client.channels.cache.get(db.fetch(`${message.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)
            }

        }

        if (antieveryone == true) {

            if (isMention == true) {

                message.channel.clone().then((ch) => {
                    ch.setParent(message.channel.parent);
                    ch.setPosition(message.channel.position);
                    message.channel.delete();
                    message.member.timeout(60000)
                    ch.send(`**le salon a été renew car <@${message.author.id}> à ping tout le serveur**`).then(msg => {
                        setTimeout(() => msg.delete(), 50000)
                    })
                })

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${message.author.id}> a mentionner \`tout le serveur\` dans \`${message.channel.name}\`, j'ai renew le salon`)
                  .setColor(color)
                    .setTimestamp()
                client.channels.cache.get(db.fetch(`${message.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)

            }
        }
    }
}
