const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner")
const cl = new db.table("Colors")
const config = require("../config")

module.exports = {
    name: 'pwebhooks',
    usage: 'pwebhooks',
    description: `Permet de Désactive toutes les permissions webhooks du serveur.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}.${message.guild.id}`) || message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id) === true) {

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["MANAGE_WEBHOOKS"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_WEBHOOKS"])).catch(() => { }))

            const permEmbed = new Discord.MessageEmbed()
                .setDescription('**Je désactive les permissions WEBHOOKS à tous les rôles.**')
                .setColor(color)

            message.channel.send({ embeds: [permEmbed] })

        }
    }
}