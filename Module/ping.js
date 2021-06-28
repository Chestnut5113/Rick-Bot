const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();
function ping(channel) {

  const embedPing = new Discord.MessageEmbed()
    .setColor('#43B581')
    .setTitle('Rick-Bot')
    .setURL('https://rick-bot.ml/')
    .setDescription(`I'm Rick-Bot \n \n I'm now serving at **${client.guilds.cache.size}** servers` + "\n \n" + `🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

		channel.send(embedPing)

};
 module.exports = ping