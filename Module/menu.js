const Discord = require('discord.js');
const message = new Discord.Message();
const { channel, author } = message;
const client = new Discord.Client();
let logChannel = client.channels.cache.get(process.env.LOG_CHANNEL_ID)
function menu(channel, author) {

const embed = new Discord.MessageEmbed()
  .setColor('#003d80')
  .setTitle('List of Command 所有指令')
  .setAuthor(
            'Rick-Bot',
            'https://imgur.com/LEXKlzu.png',
            'https://rick-bot.ml/'
        )
  .setDescription('歡迎使用 **Rick-Bot** \n Welcome To Use **Rick-Bot** \n \n :pushpin: 我的前綴是 **+** \n My prefix is **+** \n \n :books: 要獲得指令清單 輸入 `+help` \n Send `+help` for getting command list \n \n :earth_asia: 按[這裏](https://rick-bot.ml/)到訪網站 \n Click [Here](https://rick-bot.ml/) to visit the website \n \n <:Github:900314123341025320> 按[這裏](https://github.com/Chestnut5113/Rick-Bot)到訪Github \n Click [Here](https://github.com/Chestnut5113/Rick-Bot) to visit Github \n \n :thinking:  按[這裡](https://discord.gg/5TqfFzaQet)以加入支援伺服器 \n Click [Here](https://discord.gg/5TqfFzaQet) to join the support server \n \n <:Voted:836838463134498817> 可到[這裏](https://top.gg/bot/829254083008790538)投票 \n You can Vote [Here](https://top.gg/bot/829254083008790538)')
	
  channel.send('Hi! I am awake and I am listening to your commands. Need help for command? type `+help`')
	channel.send(embed)

  };
 module.exports = menu