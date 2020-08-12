const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async(client, message, args) => { 
  
   let hm = await db.fetch(`seviyeacik_${message.guild.id}`)
  let kanal = await db.fetch(`svlog_${message.guild.id}`)
  let xp = await db.fetch(`verilecekxp_${message.guild.id}`)
  let seviyerol = await db.fetch(`svrol_${message.guild.id}`)
  let rollvl = await db.fetch(`rollevel_${message.guild.id}`)
  let kxp = await db.fetch(`xp_${message.author.id}_${message.guild.id}`)
  let klvl = await db.fetch(`lvl_${message.author.id}_${message.guild.id}`)
  if(!hm) return message.channel.send('Seviye komutları aktif değil! \n `fm!seviye-aç fm!seviye-rol fm!seviye-log fm!seviye-xp fm!seviye-ayarlar fm!seviye-kapat`')
  var user = message.mentions.users.first() || message.author;
  
  let kontrol;
  if(klvl == null) kontrol = '0'
  else kontrol = kxp
  
  let kontrol2;
  if(klvl == null) kontrol2 = '0'
  else kontrol2 = klvl
  
  let seviye = new Discord.RichEmbed()
  .setTitle('Seviye Bilgisi:')
   .setAuthor(message.member.user.username, message.author.avatarURL)
  .addField('Kullanıcı:', user, true)
  .addField('Kullanıcı XP değeri:', '**'+kontrol+'**', true)
  .addField('Kullanıcı Seviye Değeri:', '**'+kontrol2+'**', true)
  .setFooter('Fırat & Mete')
  .setColor('RANDOM')
  .setTimestamp()
  .setThumbnail(user.avatarURL)
  message.channel.send(seviye)
 

 };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'seviye',
  description: 'Seviyenizi Gösterir.', 
  usage: 'seviye'
};