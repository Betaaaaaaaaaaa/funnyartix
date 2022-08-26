const { Client, Intents, guild, Collection } = require('discord.js');
const Discord = require("discord.js")
const config = require('./config')
const { readdirSync } = require("fs")
const db = require('quick.db')
ms = require("ms")
const fs = require('fs');
const path = require('path');
const p = new db.table("prefix")
const aj = new db.table("antijoin")
const wl = new db.table("WhiteList")
const color = config.app.color
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
    restTimeOffset: 0,
    partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});

client.login(config.app.token);
client.commands = new Collection();



//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  gestion Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const gestionFiles = readdirSync('./gestion').filter(file => file.endsWith('.js'));
for (const file of gestionFiles) {
    const command = require(`./gestion/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  utilities Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const utilitiesFiles = readdirSync('./utilities').filter(file => file.endsWith('.js'));
for (const file of utilitiesFiles) {
    const command = require(`./utilities/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  administration Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const administrationFiles = readdirSync('./administration').filter(file => file.endsWith('.js'));
for (const file of administrationFiles) {
    const command = require(`./administration/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  dev Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const devFiles = readdirSync('./dev').filter(file => file.endsWith('.js'));
for (const file of devFiles) {
    const command = require(`./dev/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| commande  antiraid Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const antiraidFiles = readdirSync('./antiraid').filter(file => file.endsWith('.js'));
for (const file of antiraidFiles) {
    const command = require(`./antiraid/${file}`);
    client.commands.set(command.name, command);
}

//|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬| Event Handler |▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|

const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}


client.on('message', async message => {

    const pf = config.app.px

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
        message.channel.send(`Mon prefix sur le serveur est : \`${pf}\``)
})


client.on('guildCreate', async (guild) => {
    console.log(`J'ai rejoint le serveur ${guild.name} [${guild.memberCount}]`)
    client.users.cache.get('886649065352364103').send(`Je viens de rejoindre **${guild.name}** (__${guild.memberCount} membres__)`)
})
client.on('guildDelete', async (guild) => {
    console.log(`J'ai quitter le serveur ${guild.name} [${guild.memberCount}]`)
    client.users.cache.get('886649065352364103').send(`Je viens de quitté **${guild.name}** (__${guild.memberCount} membres__)`)
})

// LEAK BY BETAA