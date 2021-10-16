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
    const musicURL = msg.content.replace(`${prefix}play`, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ').trim();

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

    // 離開頻道
    this.connection[msg.guild.id].disconnect();

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
  }
});