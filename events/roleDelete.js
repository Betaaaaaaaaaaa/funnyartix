const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const config = require('../config')

module.exports = {
    name: 'roleDelete',
    once: false,

    async execute(client, role, oldRole, newRole) {

        const audit = (await role.guild.fetchAuditLogs("ROLE_DELETE")).entries.first()

        if (db.fetch(`config.${role.guild.id}.antirole`) == true) {

            if (owner.get(`owners.${audit.executor.id}.${role.guild.id}`) || client.user.id === audit.executor.id === true) return

            if (audit.action == 'ROLE_DELETE') {

                role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                    if (role.name !== '@everyone') {
                        role.guild.members.resolve(audit.executor).roles.remove(role).catch(err => { throw err })
                    }
                })

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`supprimé un role\`, il a été sanctionné`)
                    .setTimestamp()
                client.channels.cache.get(db.fetch(`${role.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)
            }
        }
    }
}
