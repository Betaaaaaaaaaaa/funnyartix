const { MessageEmbed } = require('discord.js');
require("moment-duration-format");
const config = require("../config")
const db = require('quick.db')
const cl = new db.table("Color")
const footer = config.app.footer

module.exports = {
    name: "invite",
    async execute(client, message, args, data) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const embed = new MessageEmbed()
                .setTitle('Invite moi')
                .setDescription(`Cliquez ici pour inviter le bot [${client.user.tag}](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
                .setFooter({text: footer})
                .setColor(color)
                
            message.reply({ embeds: [embed] })
        }
    }
