const Discord = require('discord.js');
const client = new Discord.Client();
let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)
 function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.DISCORD_TOKEN));
		
 };
 module.exports = resetBot