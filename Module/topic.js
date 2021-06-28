const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();
const { content, channel, guilds, author } = message;
const user = client.users.id;

function topic(channel) {

  const topic = [
     'What is the first song sang by Rick Astley?',
		 `What is the year that Rick Astley released his first album?`,
		 'Which song reach No. 6 on both UK and US charts?',
		 'What is the name of the song that Rick Astley released the cover version which sang originally by Nat King Cole?',
		 'In which album did Rick Astley keep his long hair?',
		 'Which album was largely an Adult Contemporary album?',
		 'Which album did Astley covered 3 classic songs?',
		 'When did Rickroll start to be popular?',
		 `When did Astley 'Retired'? `
  ];
  const randomtopic = topic[Math.floor(Math.random() * topic.length)];

 const embed = new Discord.MessageEmbed()
  .setColor('#000001')
  .setTitle('The topic is')
  .setDescription(randomtopic)


 channel.send(embed);

};

 module.exports = topic