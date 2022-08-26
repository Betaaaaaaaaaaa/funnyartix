const db = require("quick.db")
const ladmin = new db.table(`logs`)

module.exports = {
    name: 'guildMemberBoost',
    once: false,

    async execute(client, member) {

        const chan = `${ladmin.fetch(`salon_${message.guild.id}`)}`
        const channel = message.guild.channels.cache.get(chan)

        channel.send({content: `${member.user.tag} viens de boost !`})

    }
}