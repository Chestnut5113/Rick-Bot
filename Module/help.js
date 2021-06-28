const Discord = require('discord.js');
const message = new Discord.Message();
const { channel, author } = message;

function help(channel, author) {

const embed = new Discord.MessageEmbed()
  .setColor('#43B581')
  .setTitle('List of Command 所有指令')
  .setAuthor(
            'Rick-Bot',
            'https://imgur.com/LEXKlzu.png',
            'https://rick-bot.ml/'
        )
  .setDescription('這是Rick-bot的所有公開指令 \n Here is all command of Rick-bot. \n \n **一般指令 General Command** \n Rickroll \n `+play` `+rickroll` `+rickgif` \n  (若然+play無法使用 請為機器人添加說話權限 Please add SPEAKING permission for the bot if +play cannot use) \n \n 導向網址 Link to different website \n `+rickyt` `+rickspotify` `+rickapple` `+rickwiki` \n \n 邀請及投票 Invite and Vote \n `+website` `+invite` `+vote` \n \n 實用 Useful \n `+ping` `+ricksay` `+8ball` `+snipe` \n (若然+ricksay無法刪除訊息 請為機器人添加管理訊息權限 Please add MESSAGE MANAGE permission for the bot if the message cannot delete while using +ricksay)\n \n \n **歌詞指令 Lyrics Command** \n We re no strangers **to love** \n You know the rules **and so do I** \n A full commitments what Im thinking of \n **You wouldnt get this from any other guy** \n I just wanna tell you how Im feeling \n **Gotta make you understand** \n Never gonna give you up \n **Never gonna let you down** \n Never gonna run around and **desert you** \n Never gonna make you cry \n **Never gonna say goodbye** \n Never gonna tell a lie **and hurt you** \n We ve known each other **for so long** \n Your heart is been aching but **you re too shy to say it** \n Inside we both know whats been **going on** \n We know the game and we re **gonna play it** \n And if you ask me how Im feeling \n **Dont tell me you re too blind to see**')
	

	channel.send('`指令清單已發送至你的私訊。The list of commands has been sent to your via DM.`')
	author.send(embed)
	
};
 module.exports = help