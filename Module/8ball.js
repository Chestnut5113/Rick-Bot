const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();

function eightball(channel) {
  const messages = [
    ':8ball: | Outlook good,' + ` **${user}**`,
    ':8ball: | Without a doubt,' + ` **${user}**`,
    ':8ball: | Cannot predict now,' + ` **${user}**`,
    ':8ball: | Concentrate and ask again,' + ` **${user}**`,
    ':8ball: | Very doubtful,' + ` **${user}**`,
    ':8ball: | My source say no,' + ` **${user}**`,
    ':8ball: | Yes, definitely,' + ` **${user}**`,
    ':8ball: | Yes, It is certain,' + ` **${user}**`,
    ':8ball: | Yes,' + ` **${user}**`
  ];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];


 channel.send(randomMessage);

};

 module.exports = eightball