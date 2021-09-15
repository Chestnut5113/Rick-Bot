const express = require('express');
const app = express();
const port = 3000;
const { prefix } = require('./config.json');
const ytdl = require('ytdl-core');
const db = require('quick.db');
const invite = require('./Module/invite');
const resetBot = require('./Module/resetBot')
const help = require('./Module/help')
const topic = require('./Module/topic');
const fact = require('./Module/fact');
const { MessageEmbed } = require('discord.js');
require('events').EventEmitter.defaultMaxListeners = 500;

app.get('/', (req, res) => res.send('<iframe src="https://giphy.com/embed/olAik8MhYOB9K" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/life-gets-down-olAik8MhYOB9K">via GIPHY</a></p>'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
  let activities = [`Rickrolling ${client.guilds.cache.size} servers`, '1 Billion Views!!', '+help', 'rick-bot.ml', 'Never Gonna Give You Up', 'Type +invite to Rickroll your server!', `Rickrolling ${client.users.cache.size} users`]
  console.log(`Logged in as ${client.user.tag}!`);

  let randomStatus = activities[Math.floor((Math.random() * activities.length))]

  setInterval(async () => {
    await client.user.setActivity(randomStatus, { type: 'WATCHING' })
  }, 10000)

});
 
client.on('message', msg => {
  const args = msg.content;
  const lowerCasedCommand = args.toLowerCase();
  let mention = msg.mentions.users.first();
  const user = msg.author.username;
	const { content, channel, guilds, author } = msg;

  if (msg.author.username === client.user.username) { return; }
  if(msg.author.bot) return;
 switch (content.toLowerCase()) {
      case '+help':
       help(channel, author);
        break;
			
			case '+ping':
			 ping(channel);
			 break;
 
  		case '+invite':
			 invite(channel);
			 break;

			case '+topic':
			 topic(channel);
			 break;
			 
			case '+fact':
			 fact(channel);
			 break;

      case 'we re no strangers': 
          msg.channel.send('to love');
          break;
      case 'you know the rules':
          msg.channel.send('and so do I');
          break;
      case 'i just wanna tell you how im feeling':
            msg.channel.send(`You wouldnt get this from any other guy`);
        break;
      case 'never gonna give you up':
          msg.channel.send('Never gonna let you down');
          break;
      case 'never gonna run around':
          msg.channel.send('and desert you');
          break;
		  case 'never gonna make you cry':
          msg.channel.send('Never gonna say good bye');
          break;
			case 'never gonna tell a lie':
          msg.channel.send('and hurt you');
          break;
			case 'we ve known each other':
          msg.channel.send('for so long');
          break;
			case 'your heart is been aching but':
          msg.channel.send('you are too shy to say it');
          break;
			case 'inside we both know whats been':
          msg.channel.send('going on');
          break;
			case 'we know the game and we re':
          msg.channel.send('gonna play it');
          break;
			case 'and if you ask me how im feeling':
          msg.channel.send(`Don't tell me you re too blind to see`);
          break;

 }
 function ping(channel) {

  const embedPing = new Discord.MessageEmbed()
    .setColor('#003d80')
    .setTitle('Rick-Bot')
    .setURL('https://rick-bot.ml/')
    .setDescription(`I'm Rick-Bot \n \n I'm now serving at **${client.guilds.cache.size}** servers` + "\n \n" + `🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

		channel.send(embedPing)

};

  if (msg.content === '+ricknitro') {
    msg.channel.send('https://dis.cord.gifts/c/qKUsu4I6vvILCTkh');
  }

  if (msg.content === '+rickyt') {
    msg.channel.send('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  }

  if (msg.content === '+rickspotify') {
    msg.channel.send('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC');
  }

  if (msg.content === '+rickapple') {
    msg.channel.send('https://music.apple.com/us/music-video/never-gonna-give-you-up/277040657');
  }



  if (msg.content === '+rickgif') {
    msg.channel.send('https://media.giphy.com/media/olAik8MhYOB9K/giphy.gif');
  }

  if (msg.content === '+rickwiki') {
    msg.channel.send('https://en.wikipedia.org/wiki/Rick_Astley')
  }

  if (msg.content === '+vote') {
    msg.channel.send(embedVote)
  }

  if (msg.content === '+website') {
    msg.channel.send('https://rick-bot.ml/')
  }
  
  if (msg.author.bot) return

  if (msg.content.toLowerCase().startsWith('+ricksay')) {
    msg.channel.send(msg.content.replace('+ricksay', ''))
    msg.delete()
  }

  if (msg.content === '+rickgif') {
    number = 7;
    imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;
    msg.channel.send({ files: ["./Rickroll/" + imageNumber + ".gif"] })
  }


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



   if (msg.content.indexOf('+8ball') > -1) {
    msg.channel.send(randomMessage);
   
  }


  const embedRickroll = new Discord.MessageEmbed()
    .setColor('#000000')
    .setAuthor('Rick Astley', 'https://i.pinimg.com/originals/21/49/9d/21499dba0eec71730fdaa0534a82e163.jpg')
    .setTitle('Not Member!')
    .setDescription('Make sure to welcome ' + `${mention}` + ' getting rick rolled again \n And watch the whole MV again on YouTube.')
    .addFields(
      { name: '**Meme Created at**', value: '1987 debut album Whenever You Need Somebody.' },
    )
    .setImage('https://i.pinimg.com/originals/88/82/bc/8882bcf327896ab79fb97e85ae63a002.gif')

  if (msg.content === ("+rickroll")) {
    msg.channel.send("```usage of command: \n +rickroll <@user id>```");
  } else if (msg.content.indexOf(`+rickroll ${mention}`) > -1) {
    msg.channel.send("Say welcome to" + `${mention}` + 'for get Rickrolled again!');
    msg.channel.send(embedRickroll);

  }

client.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

client.on('message', message => {
	  if (message.author.username === client.user.username) { return; }
  if(msg.author.bot) return;
    if(message.content === '+snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`There is nothing to snipe. BOOMER`)
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(client.users.cache.get(senderid).username, client.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(msg)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed)
				return
    }
})




  if (process.env.DEV_USERS_ID === author.id)
    switch (content.toUpperCase()) {
      case '+RESET':
       resetBot(channel);
        break;

    };

});

client.login(process.env.DISCORD_TOKEN);