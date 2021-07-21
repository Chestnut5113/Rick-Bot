const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();

function eightball(channel) {
  const messages = [
    ':8ball: | Outlook good',
    ':8ball: | Without a doubt',
    ':8ball: | Cannot predict now',
    ':8ball: | Concentrate and ask again',
    ':8ball: | Very doubtful',
    ':8ball: | My source say no',
    ':8ball: | Yes, definitely',
    ':8ball: | Yes, It is certain',
    ':8ball: | Yes'
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];



};
 module.exports = eightball