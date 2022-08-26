const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config")
const p = new db.table("Prefix")
const owner = new db.table("Owner")

var getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }
const links = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
]

module.exports = {
    name: 'messageUpdate',
    once: false,

    async execute(client, oldMessage, newMessage) {

        let isLink = false
        let antilink = await db.get(`config.${newMessage.guild.id}.antilink`)

        links.forEach(l => {
            if (newMessage.content.includes(l)) {
                isLink = true
            }
        })
        if (owner.get(`owners.${newMessage.author.id}.${newMessage.guild.id}`) || config.app.funny === newMessage.author.id === true || client.user.id === newMessage.author.id === true) return

        if (antilink == true) {
            if (isLink == true) {
                newMessage.delete()
                message.member.timeout(15000)
                newMessage.channel.send({ content: `<@${newMessage.author.id}> Tu n'as pas le droit de d'envoyé de lien dans ce serveur.` }).then(msg => {
                    setTimeout(() => msg.delete(), 6000)
                })
            }
        }
    }
}