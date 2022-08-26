const Discord = require('discord.js')
const db = require("quick.db")
const config = require('../config')
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
const blv = new db.table("blvoc")
const footer = config.app.footer


module.exports = {
    name: 'voiceStateUpdate',
    once: false,

    async execute(client, oldState, newState) {

        const categorytemp = db.get(`categorytempvoc_${oldState.guild.id}`)
        const salontempvoc = db.get(`salontempvoc_${oldState.guild.id}`)

        if (db.get(`tempvocsettings_${oldState.guild.id}`) === true) {

            //rejoint
            if (oldState.channel === null || oldState.channel) {
                if (newState.channelId === salontempvoc) {

                    var category = oldState.guild.channels.cache.get(categorytemp);
                    if (!category) return;

                    oldState.guild.channels.create(`⏱️・${newState.member.user.username}`, {
                        type: 'GUILD_VOICE',
                        parent: category,
                        reason: `Salon temporaire`,
                        permissionOverwrites: [
                            {
                                id: newState.member,
                                allow: ['MOVE_MEMBERS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MANAGE_CHANNELS', 'VIEW_CHANNEL', 'USE_VAD', 'MANAGE_ROLES', 'STREAM', 'CONNECT', 'SPEAK']
                            },
                            {
                                id: newState.guild.id,
                                allow: ['CONNECT', 'SPEAK', 'STREAM', 'USE_VAD'],
                            }
                        ]

                    }).then(funny => {

                        newState.member.voice.setChannel(funny)
                        db.set(`tempvoc_${newState.guild.id}_${newState.member.id}`, funny.id)

                    })
                }
                //leave
            }

            if (!oldState.channel) return;
            if (oldState.channel.id == db.get(`tempvoc_${newState.guild.id}_${newState.member.id}`)) {

                if (oldState.channel.id === salontempvoc) return;
                if (oldState.channel.members.size === 0) {

                    oldState.channel.delete({ reason: `Salon temporaire - Plus personne dans le salon` })
                    db.delete(`tempvoc_${oldState.guild.id}_${newState.member.id}`)
                }

            }
        }
    }
}