const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const config = require('../config')
const cl = new db.table("Color")
module.exports = {
    name: 'channelCreate',
    once: false,

    async execute(client, channel) {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color
        if (db.get(`config.${channel.guild.id}.antichannel`) == true) {

            const audit = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(audits => audits.entries.first())

            if (owner.get(`owners.${audit.executor.id}.${channel.guild.id}`) || config.app.owners === audit.executor.id === true || client.user.id === audit.executor.id === true) return

            channel.delete()

            channel.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                if (role.name !== '@everyone') {
                    channel.guild.members.resolve(audit.executor).roles.remove(role).catch(err => { throw err })
                }
            })

            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a tenté de \`créer un salon\`, il a été sanctionné`)
                .setColor(color)
                .setTimestamp()
            client.channels.cache.get(db.fetch(`${channel.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)

        }
    }
}