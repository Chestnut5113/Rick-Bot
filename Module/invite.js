const Discord = require('discord.js');
const message = new Discord.Message();
const { channel, author } = message;


function invite(channel) {

const embedInvite = new Discord.MessageEmbed()
  .setColor('#003d80')
  .setTitle('Invite')
   .setAuthor(
            'Rick-Bot',
            'https://imgur.com/LEXKlzu.png',
            'https://rick-bot.ml/'
        )
  .setDescription('[按此](https://discord.com/api/oauth2/authorize?client_id=829254083008790538&permissions=1362001&scope=bot)讓我加入你的伺服器! <a:Rick_Astley_1:805027466107551775>Rickroll Time!<a:Rick_Astley_1:805027466107551775> \n \n Click [here](https://discord.com/api/oauth2/authorize?client_id=829254083008790538&permissions=1362001&scope=bot) to let me join your server! <a:Rick_Astley_1:805027466107551775>Rickroll Time!<a:Rick_Astley_1:805027466107551775>')

	channel.send(embedInvite);
};
 module.exports = invite