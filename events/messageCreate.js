const db = require("quick.db")
const p = new db.table("Prefix")
const config = require('../config')

module.exports = {
    name: "messageCreate",

    async execute(client, message) {

        if (message.author.bot) return
        if (message.channel.type == "DM") return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        const args = message.content.slice(pf.length).trim().split(' ')
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName)

        if (!message.content.startsWith(pf) || message.author.bot) return
        if (!command) return

        try {
            command.execute(client, message, args)

        } catch (error) {
            message.channel.send({ content: `Erreur dans l'exécution du code.` })
        }
    }
}