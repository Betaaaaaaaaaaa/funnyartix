const Discord = require("discord.js")
const config = require("../config")


module.exports = {
    name: 'setname',
    usage: 'setname <name>',
    description: `Permet de changer le nom du bot.`,
    async execute(client, message, args) {

        if (config.app.funny.includes(message.author.id) === true) {

            if (args.length) {
                let str_content = args.join(" ")
                client.user.setUsername(str_content)
                    .then(u => message.channel.send(`${message.author}, Vous avez changé le **nom** de votre bot.`))
                    .catch(e => { message.channel.send(`${message.author}, Erreur `); });
            } else {
                message.channel.send(`${message.author}, Vous n'avez pas fournie de **nom valide**`);
            }

        }
    }
}