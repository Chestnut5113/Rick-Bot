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


client.on('ready', () => {
  let activities = [`Rickrolling ${client.guilds.cache.size} servers`, '1 Billion Views!!', '+help', 'rick-bot.ml', 'Never Gonna Give You Up', '+play for Rickroll', `Rickrolling ${client.users.cache.size} users`]
  let randomStatus = activities[Math.floor((Math.random() * activities.length))]
let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)
  console.log(`Logged in as ${client.user.tag}!`);
  logChannel.send(`Timestamp: ${new Date().toTimeString()}, bot is booted.`);

  setInterval(async () => {
    await client.user.setActivity(randomStatus, { type: 'WATCHING' })
  }, 10000)

  setInterval(async () => 
   await resetBot, 43200000)

});

client.on("guildCreate", guild => {
	let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)

	logChannel.send(`The bot just joined to ${guild.name}, Owned by ${guild.owner.user.tag} \r Invite link: ${guild.code} `);

});

 class Music {

  constructor() {
    this.isPlaying = {};
    this.queue = {};
    this.connection = {};
    this.dispatcher = {};
  }

  async join(msg) {

    // Bot 加入語音頻道
    this.connection[msg.guild.id] = await msg.member.voice.channel.join();

  }

  async play(msg) {

    // 語音群的 ID
    const guildID = msg.guild.id;

    // 如果 Bot 還沒加入該語音群的語音頻道
    if (!this.connection[guildID]) {
      music.join(msg);
    }

    // 處理字串，將 !!play 字串拿掉，只留下 YouTube 網址
		const url = [
			'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			'https://www.youtube.com/watch?v=yPYZpwSpKmA',
			'https://www.youtube.com/watch?v=BeyEGebJ1l4'
		]
		const randomURL = url[Math.floor(Math.random() * url.length)];
    const musicURL = msg.content.replace(`${prefix}play`, randomURL).trim();

    try {

      // 取得 YouTube 影片資訊
      const res = await ytdl.getInfo(musicURL);
      const info = res.videoDetails;

      // 將歌曲資訊加入隊列
      if (!this.queue[guildID]) {
        this.queue[guildID] = [];
      }

      this.queue[guildID].push({
        name: info.title,
        url: musicURL
      });


      // 如果目前正在播放歌曲就加入隊列，反之則播放歌曲
      if (this.isPlaying[guildID]) {
        msg.channel.send(`歌曲加入隊列：${info.title}`);
      } else {
        this.isPlaying[guildID] = true;
        this.playMusic(msg, guildID, this.queue[guildID][0]);
      }

    } catch (e) {
      console.log(e);
    }

  }

  playMusic(msg, guildID, musicInfo) {

    // 提示播放音樂
    msg.channel.send(`<a:Rick_Astley_1:805027466107551775>Rickroll Time!<a:Rick_Astley_1:805027466107551775>`);

    // 播放音樂
    this.dispatcher[guildID] = this.connection[guildID].play(ytdl(musicInfo.url, { filter: 'audioonly' }));

    // 把音量降 50%，不然第一次容易被機器人的音量嚇到 QQ
    this.dispatcher[guildID].setVolume(0.5);

    // 移除 queue 中目前播放的歌曲
    this.queue[guildID].shift();

    // 歌曲播放結束時的事件
    const self = this;
    this.dispatcher[guildID].on('finish', () => {

      // 如果隊列中有歌曲
			delete this.queue[msg.guild.id];
      this.connection[msg.guild.id].disconnect();

    });

  }

  resume(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Song Resume');

      // 恢復播放
      this.dispatcher[msg.guild.id].resume();
    }

  }

  pause(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Pause');

      // 暫停播放
      this.dispatcher[msg.guild.id].pause();
    }

  }

  skip(msg) {

    if (this.dispatcher[msg.guild.id]) {
      msg.channel.send('Skipped');

      // 跳過歌曲
      this.dispatcher[msg.guild.id].end();
    }

  }


    leave(msg) {

        // 如果機器人在頻道中
        if (this.connection[msg.guild.id] && this.connection[msg.guild.id].status === 0) {

            // 如果機器人有播放過歌曲
            if (this.queue.hasOwnProperty(msg.guild.id)) {

                // 清空播放列表
                delete this.queue[msg.guild.id];

                // 改變 isPlaying 狀態為 false
                this.isPlaying[msg.guild.id] = false;
            }

            // 離開頻道
            this.connection[msg.guild.id].disconnect();
        } else {
            msg.channel.send('Please Add Bot to Voice Channel');
        }

    }
}


const music = new Music();

// 當 Bot 接收到訊息時的事件
client.on('message', async (msg) => {

  // 如果發送訊息的地方不是語音群（可能是私人），就 return
  if (!msg.guild) return;


  // 如果使用者輸入的內容中包含 !!play
  if (msg.content.indexOf(`${prefix}play`) > -1) {

    // 如果使用者在語音頻道中
    if (msg.member.voice.channel) {

      // 播放音樂
      music.join(msg);
      await music.play(msg);
			msg.react('<a:Rick_Astley_1:805027466107551775>');
    } else {

      // 如果使用者不在任何一個語音頻道
      msg.reply('Please join Voice Channel First');
    }
  }



  // !!resume
  if (msg.content === `${prefix}resume`) {

    // 恢復音樂
    music.resume(msg);
  }

  // !!pause
  if (msg.content === `${prefix}pause`) {

    // 暫停音樂
    music.pause(msg);
		msg.react('<:thinking_good:805024773787615253>');
  }

  // !!skip
  if (msg.content === `${prefix}skip`) {

    // 跳過音樂
    music.skip(msg);
  }


  // !!leave
  if (msg.content === `${prefix}leave`) {

    // 機器人離開頻道
    music.leave(msg);
		msg.react(':wave:');
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
    .setDescription(`I'm Rick-Bot \n \n I'm now serving at **${client.guilds.cache.size}** servers` + "\n \n" + `🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

		msg.lineReplyNoMention(embedPing)

};
  
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
			case '+DELETE':
			 deletesqlite(channel);
			  break;

    };
		
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
            return message.channel.send(`There is nothing to snipe. BOOMER`)
        }
        let embed = new Discord.MessageEmbed()
        .setTitle(client.users.cache.get(senderid).username, client.users.cache.get(senderid).displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(msg)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed)
    }
})

client.login(process.env.DISCORD_TOKEN);