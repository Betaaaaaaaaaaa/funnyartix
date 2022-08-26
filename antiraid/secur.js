const Discord = require("discord.js")
const config = require("../config")
const db = require("quick.db")
const owner = new db.table("Owner")
const p = new db.table("Prefix")
const cl = new db.table("Color")

module.exports = {
    name: 'secur',
    usage: 'secur',
    description: `Permet de config l'antiraid.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}.${message.guild.id}`) || message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const emojion = '✅'
            const emojioff = '❌'

            let al = await db.get(`config.${message.guild.id}.antilink`)
            if (al == true) al = `${emojion}`
            if (al == false) al = `${emojioff}`
            if (al == null) al = `${emojioff}`

            let ab = await db.get(`config.${message.guild.id}.antiban`)
            if (ab == true) ab = `${emojion}`
            if (ab == false) ab = `${emojioff}`
            if (ab == null) ab = `${emojioff}`

            let ac = await db.get(`config.${message.guild.id}.antichannel`)
            if (ac == true) ac = `${emojion}`
            if (ac == false) ac = `${emojioff}`
            if (ac == null) ac = `${emojioff}`

            let ar = await db.get(`config.${message.guild.id}.antirole`)
            if (ar == true) ar = `${emojion}`
            if (ar == false) ar = `${emojioff}`
            if (ar == null) ar = `${emojioff}`

            let abo = await db.get(`config.${message.guild.id}.antibot`)
            if (abo == true) abo = `${emojion}`
            if (abo == false) abo = `${emojioff}`
            if (abo == null) abo = `${emojioff}`

            let aw = await db.get(`config.${message.guild.id}.antiwebhook`)
            if (aw == true) aw = `${emojion}`
            if (aw == false) aw = `${emojioff}`
            if (aw == null) aw = `${emojioff}`

            let ae = await db.get(`config.${message.guild.id}.antieveryone`)
            if (ae == true) ae = `${emojion}`
            if (ae == false) ae = `${emojioff}`
            if (ae == null) ae = `${emojioff}`


            const embed = new Discord.MessageEmbed()
                .setTitle(`:shield: Sécurité du serveur`)
                .setDescription(`[• Antilink ${al}](https://discord.gg/FAZgBcCj3t)\n[• Antiban ${ab}](https://discord.gg/FAZgBcCj3t)\n[• AntiChannel ${ac}](https://discord.gg/FAZgBcCj3t)\n[• Antieveryone ${ae}](https://discord.gg/FAZgBcCj3t)\n[• Antirole ${ar}](https://discord.gg/FAZgBcCj3t)\n[• Antibot ${abo}](https://discord.gg/FAZgBcCj3t)\n[• AntiWebhook ${aw}](https://discord.gg/FAZgBcCj3t)`)
           
              .setColor(color)
                  message.channel.send({ embeds: [embed] })

        }
    }
}