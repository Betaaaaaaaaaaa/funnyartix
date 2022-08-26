const Discord = require("discord.js")
const config = require("../config")
const db = require('quick.db')
const p = new db.table("prefix")
const footer = config.app.footer
const color = config.app.color
const paginationEmbed = require('discordjs-button-pagination')

module.exports = {
    name: 'help',
    usage: 'help',
    category: "utils",
    description: `Permet d'afficher l'help.`,
    async execute(client, message, args, color) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        //Embed Help

        const Help = new Discord.MessageEmbed()
            .setTitle(`📚・Panel d'aide ${client.user.username}`)
            .setDescription(`<:badgedeveloper:975416210600624128>・Développeur <@${config.app.funny}>`)
            .setImage('https://cdn.discordapp.com/attachments/957096644472635404/979023172919763045/killayes.gif')
            .setColor(config.app.color)
            .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })

        //Embed Owner

        const utilities = new Discord.MessageEmbed()
            .setTitle("Utilitaire")
            .setDescription(`

**\`${pf}help\`**
Pour obtenir la liste des commandes

**\`${pf}pic\`**
Récupérer la photo de profil d'un membre

**\`${pf}ping\`**
Affiche le ping du bot

**\`${pf}userinfo\`**
Affiché des informations sur un membre

**\`${pf}serveur info\`**
Informations sur le serveur

**\`${pf}botinfo\`**
Informations relatives au bot

**\`${pf}vc\`**
Affiché les statistiques du serveur

**\`${pf}invite\`**
Donne une invitation du bot


          `)
            .setColor(color)


        const moderation = new Discord.MessageEmbed()
            .setTitle("Modération")
            .setDescription(`

**\`${pf}ban <@>\`**
Bannir un membre du serveur

**\`${pf}unban <ID>\`**
Unban un membre du serveur

**\`${pf}kick\`**
Kick un membre du serveur

**\`${pf}lock\`**
Vérouille un salon pour que les membres ne puissent plus parler

**\`${pf}unlock\`**
Dévérouille un salon pour que les membres puissent parler

**\`${pf}renew\`**
Recréé un salon

**\`${pf}roleinfo <@/ID>\`**
Affiché les informations d'un role sur le serveur

          `)
            .setColor(color)

        const antiraid = new Discord.MessageEmbed()
            .setTitle("Antiraid")
            .setDescription(`

**\`${pf}secur\`**
Affiche les protections sur le serveur

**\`${pf}rlogs <#/ID>\`**
Salon dans le quel sera envoyé toutes les logs de raid

**\`${pf}antilink on/off\`**
**\`${pf}antiban on/off\`**
**\`${pf}antichannel on/off\`**
**\`${pf}antirole on/off\`**
**\`${pf}antichannel on/off\`**
**\`${pf}antieveryone on/off\`**
**\`${pf}antiwebhook on/off\`**
**\`${pf}antibot on/off\`**

          `)
            .setColor(color)

        const admin = new Discord.MessageEmbed()
            .setTitle("Administration")
            .setDescription(`

**\`${pf}owner add/remove/list <@>\`**
Permet d'owner un membre sur le bot
Pour réalisé cette commande il faut avoir la couronne du serveur

**\`${pf}tempvoc\`**
Affiche un menu interactif pour gérer les vocaux temporaires sur le serveur

**\`${pf}emoji\`**
Ajouté un emoji sur le serveur

**\`${pf}prefix\`**
Définir un nouveau prefix du bot sur le serveur

**\`${pf}theme\`**
Changer la couleur du bot

**\`${pf}massiverole add/remove <@role>\`**
Permet d'ajouté un role à tout les membres du serveur

**\`${pf}adminlist\`**
Affiche tous les administrateurs présents sur le serveur*

**\`${pf}botlist\`**
Affiche tous les bots présents sur le serveur

          `)
            .setColor(color)

        const gestion = new Discord.MessageEmbed()
            .setTitle("Gestion")
            .setDescription(`
            
**\`${pf}pall\`**
Désactive __toutes les permissions__ du serveur 
            
**\`${pf}padmin\`**
Désactive toutes les permissions __administateur__ du serveur
            
**\`${pf}prole\`**
Désactive toutes les permissions __roles__ du serveur
            
**\`${pf}pban\`**
Désactive toutes les permissions __ban__ du serveur
            
**\`${pf}pkick\`**
Désactive toutes les permissions __kick__ du serveur
            
**\`${pf}pvoc\`**
Désactive toutes les permissions __voc__ du serveur
            
**\`${pf}pwebhooks\`**
Désactive toutes les permissions __webhooks__ du serveur
            
**\`${pf}pviewc\`**
Désactive toutes les permissions __voir les salons__ du serveur
            
**\`${pf}pserveur\`**
Désactive toutes les permissions __Gérer le serveur__ du serveur
            
**\`${pf}peveryone\`**
Désactive toutes les permissions __Everyone__ du serveur

          `)
            .setColor(color)


        const button1 = new Discord.MessageButton()
            .setCustomId('gauche')
            .setLabel('<<<')
            .setStyle('DANGER');

        const button2 = new Discord.MessageButton()
            .setCustomId('droite')
            .setLabel('>>>')
            .setStyle('DANGER');


        pages = [
            utilities,
            moderation,
            antiraid,
            admin,
            gestion

        ];

        buttonList = [
            button1,
            button2
        ]

        paginationEmbed(message, pages, buttonList);
        return
    }

}