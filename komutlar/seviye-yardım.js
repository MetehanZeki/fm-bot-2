const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('BLUE')
.setTitle('Seviye Komutları')
.setTimestamp()
.addField('fm!seviye','Seviyenizi gösterir.')
.addField('fm!seviye-ayarlar','seviye komutlarının sunucudaki ayarlarını atar.')
.addField('fm!seviye-aç','Seviye Sistemini açarsınız.')
.addField('fm!seviye-kapat','Seviye sistemini kapatırsınız.')
.addField('fm!seviye-log','Level atlayan kullanıcıları bu kanala atar.')
.addField('fm!seviye-rol','Seviye ödülünü ayarlarsınız.')
.addField('fm!seviye-xp','mesaj başına gelecek puanı ayarlarsınız.')
.setFooter('Fırat & Mete Seviye Sistemi.')
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["s-yardım"], 
  permLevel: 0 
};

exports.help = {
  name: 'seviye-sistemi',
  description: 'Seviye komutlarını gösterir.',
  usage: 'seviye-yardım'
};