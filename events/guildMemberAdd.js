const Discord = require('discord.js')
const moment = require('moment');
const config = require('../config')
const db = require("quick.db")
const cl = new db.table("Color")
const owner = new db.table("Owner")

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    async execute(client, member) {

        let color = cl.fetch(`color_${member.guild.id}`)
        if (color == null) color = config.app.color

        if (member.user.bot) {

            if (db.get(`config.${member.guild.id}.antibot`) === true) {

                const action = await member.guild.fetchAuditLogs({ limit: 1, type: "BOT_ADD" }).then(async (audit) => audit.entries.first());
                if (action.executor.id === client.user.id) return;

                let perm = config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}.${member.guild.id}`)

                if (!perm) {

                    member.kick('Antibot')


                    member.guild.members.resolve(action.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            member.guild.members.resolve(action.executor).roles.remove(role).catch(err => { throw err })
                        }
                    })
                }

                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${action.executor.id}> a ajouté un \`bot\` au serveur\nBot ajouté: <@${member.id}>`)
                    .setTimestamp()
                client.channels.cache.get(db.fetch(`${member.guild.id}.raidlog`)).send({ embeds: [embed] }).catch(console.error)

            }
        }
    }
}
