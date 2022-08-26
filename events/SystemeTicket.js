const { Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu, Message } = require('discord.js');
const messageCreate = require('./messageCreate');
const config = require('../config')
const db = require('quick.db')
const permticket = new db.table(`ticketrole`)


const color = 'RED'
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message) {
        if (!interaction.isSelectMenu()) return;
        const row = new MessageActionRow()
            .addComponents(

                new MessageSelectMenu()

                    .setCustomId('ticket')
                    .setPlaceholder('Selectionner pour fermé le ticket !')
                    .addOptions([
                        {
                            label: '🔒 Fermé le ticket',
                            description: 'Supprime le salon',
                            value: 'delete',
                        }
                    ])
            );


        const roleStaff = permticket.fetch(`role_${interaction.guild.id}`)

        // let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)

        if (interaction.customId === "ticket") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
            }
        }

        if (interaction.customId == "select") {
            //    if (DejaUnChannel) return interaction.reply({ content: '❌ Vous avez déja un ticket d\'ouvert sur le serveur.', ephemeral: true })

            if (interaction.values[0] == "open") {
                let categorie = db.fetch(` ${interaction.guild.id}.categorie`)
                if (categorie === null) {
                    interaction.guild.channels.create(`ticket de ${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        topic: `${interaction.user.id}`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            },
                            {
                                id: interaction.user.id,
                                allow: [`VIEW_CHANNEL`]
                            },
                            {
                                id: roleStaff,
                                allow: [`VIEW_CHANNEL`]
                            },

                        ]
                    }).then((c) => {
                        const ticket = new MessageEmbed()
                            .setTitle('📧・Ticket')
                            .setDescription('Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.')
                            .setFooter({ text: 'Support' })
                            .setColor(`${color}`)
                        c.send({ embeds: [ticket], components: [row] })
                        interaction.reply({ content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`, ephemeral: true })
                    })
                } else {
                    interaction.guild.channels.create(`ticket de ${interaction.user.username}`, {
                        type: 'GUILD_TEXT',
                        topic: `${interaction.user.id}`,
                        parent: `${categorie}`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            },
                            {
                                id: interaction.user.id,
                                allow: [`VIEW_CHANNEL`]
                            },
                            {
                                id: roleStaff,
                                allow: [`VIEW_CHANNEL`]
                            },

                        ]
                    }).then((c) => {
                        const ticket = new MessageEmbed()
                            .setTitle('📧・Ticket')
                            .setDescription('Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.')
                            .setFooter({ text: 'Support' })
                            .setColor(`${color}`)
                        c.send({ embeds: [ticket], components: [row] })
                        interaction.reply({ content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`, ephemeral: true })
                    })
                }
            } else if (interaction.values[0] == "rien") {

                interaction.reply({ content: `Action annulée`, ephemeral: true })
            }
        }

        else if (interaction.values[0] == "rien") {

            interaction.reply({ content: `Action annulée`, ephemeral: true })
        }
    }
}