const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message) => {
 if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açıktır.')
const devtr = message.guild.emojis.map((e, x) => ('\n ID: ' + x + '\n Emoji: ' + e)).join('\n');


 const embed = new Discord.RichEmbed()
.setThumbnail(client.user.avatarURL)
.setTitle(`${message.guild.name} - Sunucusundaki Emojiler`)
.setDescription(`**${devtr || "emoji yok"}**`)
.setColor("RANDOM")
  message.channel.send(devtr)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'emojiler',
  description: 'Sunucudaki emojileri gösterir!',
  usage: 'emojiler'
};

