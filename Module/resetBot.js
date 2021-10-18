const Discord = require('discord.js');
const client = new Discord.Client();

 function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(process.env.DISCORD_TOKEN));
		
 };
 module.exports = resetBot