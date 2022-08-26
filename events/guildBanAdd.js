const Discord = require('discord.js')
const config = require('../config')
const db = require("quick.db")
const cl = new db.table("Color")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const ab = new db.table("Antiban")

module.exports = {
    name: 'guildBanAdd',
    once: false,

    async execute(guild, user) {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color
        if (db.get(`config.${user.guild.id}.antiban`) === true) {

            const action = await user.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());

            let perm = config.app.funny == action.executor.id || owner.get(`owners.${action.executor.id}.${user.guild.id}`)
            if (!perm) {

                user.guild.members.kick(action.executor.id, { reason: `Antiban` })

            }
        }
    }
}