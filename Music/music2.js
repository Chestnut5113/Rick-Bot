const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();

async function play(voiceChannel) {
	const connection = await voiceChannel.join();
	connection.play('Rick Astley - Never Gonna Give You Up (Official Music Video).mp3');
}


 module.exports = play