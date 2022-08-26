const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner")
const cl = new db.table("Colors")
const config = require("../config")


module.exports = {
    name: 'pall',
    usage: 'pall',
    category: "owner",
    description: `Permet de Désactive toutes les permissions du serveur.`,
    async execute(client, message, args) {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = config.app.color

        if (owner.get(`owners.${message.author.id}.${message.guild.id}`) || message.guild.ownerId === message.author.id || config.app.funny.includes(message.author.id) === true) {

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"])).catch(() => { }))

            const permEmbed = new Discord.MessageEmbed()
                .setDescription('**Je désactive toute les permissions à tous les rôles.**')
                .addField("`Permissions Désactivé`", "Permission: **ADMINISTRATOR**, **MANAGE_ROLES**, **KICK_MEMBERS**, **BAN_MEMBERS**, **MANAGE_WEBHOOKS**, **MUTE_MEMBERS**, **MOVE_MEMBERS**, **MANAGE_GUILD**")
                .setColor(color)
            message.channel.send({ embeds: [permEmbed] })

        }
    }
}