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
const menu = require('./Module/menu');
const { joinVoiceChannel } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const adapterCreator = require('@discordjs/voice');

require('events').EventEmitter.defaultMaxListeners = 500;

app.get('/', (req, res) => res.send('<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

// ================= START BOT CODE ===================
const Discord = require('discord.js');
require('discord-reply');
const client = new Discord.Client();
const message = new Discord.Message();

client.on('ready', () => {
  let activities = [`Rickrolling ${client.guilds.cache.size} servers`, '1 Billion Views!!', '+rick', 'rick-bot.ml', 'Never Gonna Give You Up', '+play for Rickroll', 'Rick Astley', `Rickrolling ${client.users.cache.size} users`]
  let randomStatus = activities[Math.floor((Math.random() * activities.length))]

  setInterval(async () => 
    await client.user.setActivity(randomStatus, { type: 'WATCHING' }), 20000)
  let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)
  console.log(`Logged in as ${client.user.tag}!`);
  logChannel.send(`Timestamp: ${new Date().toTimeString()}, bot is booted.`);

  setInterval(async () => 
   await resetBot, 43200000)


  setInterval(async () =>
	 await logChannel.send(`I'm alive`), 5500000)

});

client.on("guildCreate", guild => {
	let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)
 let channels = guild.channels.cache;
    let channelID;
    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send('Thank you for adding me into your server! Need command help? Type `+rick`!');
   channel.createInvite({ unique: true, temporary: false }).then(invite => {
   console.log(invite.code);

  logChannel.send(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag} \r Invite link: discord.gg/${invite.code} `);
	});

});
 class Music {

  constructor() {
    this.isPlaying = {};
    this.queue = {};
    this.connection = {};
    this.dispatcher = {};
  }

  async join(msg) {

    // Bot ??????????????????
    this.connection[msg.guild.id] = await msg.member.voice.channel.join();

  }

  async play(msg) {

    // ???????????? ID
    const guildID = msg.guild.id;

    // ?????? Bot ???????????????????????????????????????
    if (!this.connection[guildID]) {
      music.join(msg);
    }

    // ?????????????????? !!play ???????????????????????? YouTube ??????
		const url = [
			'https://www.youtube.com/watch?v=WVOEPa4Ot0Y',
			'https://www.youtube.com/watch?v=O81lzff27os',
			'https://www.youtube.com/watch?v=raBobo3GZYA'
		]
		const randomURL = url[Math.floor(Math.random() * url.length)];
    const musicURL = msg.content.replace(`${prefix}play`, randomURL).trim();

    try {

      // ?????? YouTube ????????????
      const res = await ytdl.getInfo(musicURL);
      const info = res.videoDetails;

      // ???????????????????????????
      if (!this.queue[guildID]) {
        this.queue[guildID] = [];
      }

      this.queue[guildID].push({
        name: info.title,
        url: musicURL
      });


      // ?????????????????????????????????????????????????????????????????????
      if (this.isPlaying[guildID]) {
        msg.channel.send(`?????????????????????${info.title}`);
      } else {
        this.isPlaying[guildID] = true;
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      }

    } catch (e) {
      console.log(e);
    }

  }

  playMusic(msg, guildID, musicInfo) {

    // ??????????????????
    msg.channel.send(`<a:Rick_Astley_1:805027466107551775>Rickroll Time!<a:Rick_Astley_1:805027466107551775>`);

    // ????????????
    this.dispatcher[guildID] = this.connection[guildID].play(ytdl(musicInfo.url, { filter: 'audioonly' }));

    // ???????????? 50%??????????????????????????????????????????????????? QQ
    this.dispatcher[guildID].setVolume(0.5);

    // ?????? queue ????????????????????????
    this.queue[guildID].shift();

    // ??????????????????????????????
    const self = this;
    this.dispatcher[guildID].on('finish', () => {

      // ????????????????????????
			delete this.queue[msg.guild.id];
      this.connection[msg.guild.id].disconnect();

    });

  }

  resume(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Song Resume');

      // ????????????
      this.dispatcher[msg.guild.id].resume();
    }

  }

  pause(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Pause');

      // ????????????
      this.dispatcher[msg.guild.id].pause();
    }

  }

  skip(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Skipped');

      // ????????????
      this.dispatcher[msg.guild.id].end();
    }

  }


    leave(msg) {

        // ???????????????????????????
        if (this.connection[msg.guild.id] && this.connection[msg.guild.id].status === 0) {

            // ?????????????????????????????????
            if (this.queue.hasOwnProperty(msg.guild.id)) {

                // ??????????????????
                delete this.queue[msg.guild.id];

                // ?????? isPlaying ????????? false
                this.isPlaying[msg.guild.id] = false;
            }

            // ????????????
            this.connection[msg.guild.id].disconnect();
        } else {
            msg.channel.send('Please Add Bot to Voice Channel');
        }

    }
}


const music = new Music();

// ??? Bot ???????????????????????????
client.on('message', async (msg) => {

  // ????????????????????????????????????????????????????????????????????? return
  if (!msg.guild) return;


  // ??????????????????????????????????????? !!play
  if (msg.content.indexOf(`${prefix}play`) > -1) {

    // ?????????????????????????????????
    if (msg.member.voice.channel) {

      // ????????????
      music.join(msg);
      await music.play(msg);
			msg.react('<a:Rick_Astley_1:805027466107551775>');
    } else {

      // ?????????????????????????????????????????????
      msg.reply('Please join Voice Channel First');
    }
  }



  // !!resume
  if (msg.content === `${prefix}resume`) {

    // ????????????
    music.resume(msg);
  }

  // !!pause
  if (msg.content === `${prefix}pause`) {

    // ????????????
    music.pause(msg);
		msg.react('<:thinking_good:805024773787615253>');
  }

  // !!skip
  if (msg.content === `${prefix}skip`) {

    // ????????????
    music.skip(msg);
  }


  // !!leave
  if (msg.content === `${prefix}leave`) {

    // ?????????????????????
    music.leave(msg);
		msg.react('<:thinking_good:805024773787615253>');
  }
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

			case '+rick':
			 menu(channel);
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
          msg.lineReplyNoMention('to love');
          break;
      case 'you know the rules':
          msg.lineReplyNoMention('and so do I');
          break;
      case 'i just wanna tell you how im feeling':
            msg.lineReplyNoMention(`You wouldnt get this from any other guy`);
        break;
      case 'never gonna give you up':
          msg.lineReplyNoMention('Never gonna let you down');
          break;
      case 'never gonna run around':
          msg.lineReplyNoMention('and desert you');
          break;
		  case 'never gonna make you cry':
          msg.lineReplyNoMention('Never gonna say good bye');
          break;
			case 'never gonna tell a lie':
          msg.lineReplyNoMention('and hurt you');
          break;
			case 'we ve known each other':
          msg.lineReplyNoMention('for so long');
          break;
			case 'your heart is been aching but':
          msg.lineReplyNoMention('you are too shy to say it');
          break;
			case 'inside we both know whats been':
          msg.lineReplyNoMention('going on');
          break;
			case 'we know the game and we re':
          msg.lineReplyNoMention('gonna play it');
          break;
			case 'and if you ask me how im feeling':
          msg.lineReplyNoMention(`Don't tell me you re too blind to see`);
          break;
			case '+ricknitro':
			    msg.lineReplyNoMention('https://dis.cord.gifts/c/qKUsu4I6vvILCTkh');
					break;
			case '+rickyt':
			    msg.lineReplyNoMention('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
					break;
			case '+rickspotify':
			    msg.lineReplyNoMention('https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC')
					break;
		  case '+rickapple':
			    msg.lineReplyNoMention('https://music.apple.com/us/music-video/never-gonna-give-you-up/277040657')
					break;
		  case '+rickwiki':
          msg.lineReplyNoMention('https://en.wikipedia.org/wiki/Rick_Astley')
					break;
 }

 function ping(channel) {

  const embedPing = new Discord.MessageEmbed()
    .setColor('#003d80')
    .setTitle('Rick-Bot')
    .setURL('https://rick-bot.ml/')
    .setDescription(`I'm Rick-Bot \n \n I'm now serving at **${client.guilds.cache.size}** servers` + "\n \n" + `????Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

		msg.lineReplyNoMention(embedPing)

};
  
  if (msg.author.bot) return
  if (msg.content.toLowerCase().startsWith('+ricksay')) {
    msg.channel.send(msg.content.replace('+ricksay', ''))
    msg.delete()
  }

  if (msg.content === '+rickgif') {
    number = 9;
    imageNumber = Math.floor(Math.random() * (number - 1 + 1)) + 1;
    msg.channel.send({ files: ["./GIF/Rickroll/" + imageNumber + ".gif"] })
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
    msg.lineReplyNoMention("```usage of command: \n +rickroll <@user id>```");
  } else if (msg.content.indexOf(`+rickroll ${mention}`) > -1) {
		msg.delete()
    msg.channel.send("Say welcome to " + `${mention}` + ' for get Rickrolled again!');
    msg.channel.send(embedRickroll);

  }



  if (process.env.DEV_USERS_ID === author.id)
    switch (content.toUpperCase()) {
      case '+RESET':
       resetBot(channel);
        break;
    };
		
});

const fs = require('fs').promises;
const path = require('path');

client.on('message', async (message) => {
  if (message.author.id != process.env.DEV_USERS_ID || !message.content.startsWith('+deletefile')) return;

  try {
    // change the path to your file
    await fs.unlink(path.join(__dirname, './json.sqlite'));
    message.channel.send('File is deleted. ????');
  } catch (error) {
    console.log(error);
    message.channel.send('?????? Oops, there was an error. File is not deleted.');
  }
});

client.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
})

client.on('message', message => {
    if(message.content === '+snipe') {
        let msg = db.get(`snipemsg_${message.channel.id}`)
        let senderid = db.get(`snipesender_${message.channel.id}`)
        if(!msg) {
            return message.channel.send(`There is nothing to snipe. <a:Rick_Astley_1:805027466107551775>`)
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(client.users.cache.get(senderid).username, client.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(msg)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed).catch(error => {
    logChannel.send(error)
		console.log(error);
    })
		}
})
client.login(process.env.DISCORD_TOKEN);