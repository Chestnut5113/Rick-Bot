const Discord = require('discord.js');
const message = new Discord.Message();
const client = new Discord.Client();
const { content, channel, guilds, author } = message;
const user = client.users.id;

function fact(channel) {

  const fact = [
     `Never Gonna Give You Up is the year's highest-selling single in 1987.`,
		 `Whenever You Need Somebody making Astley the top-selling British act of the year.`,
		 'Body And Soul is the first album that Astley start to sing in adult contemporary.',
		 'In live concerts, Astley sings Never Gonna Give You Up in A minor.',
		 `Rickroll start popular in 2007, when a user in 4chan send a troll link about Grand Theft Auto IV's sneak preview.`,
		 'On June 17, 2020, a Reddit user successfully rickrolled Astley himself.',
		 'Astley does not use autotune for his songs.',
		 'When did Rickroll start to be popular?'
		 
  ];
  const randomfact = fact[Math.floor(Math.random() * fact.length)];

 const embed = new Discord.MessageEmbed()
  .setColor('#000001')
  .setTitle('The topic is')
  .setDescription(randomfact)


 channel.send(embed);

};

 module.exports = fact