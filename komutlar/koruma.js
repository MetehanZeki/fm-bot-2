	const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
 if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açıktır.')
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Bu komutu kullanmak için `Yönetici` yetkisine sahip olmalısın.")
  if(!args[0]) {
    message.channel.send(`Koruma Sistemini Aktifleştirmek İçin **${prefix}koruma aç**`)
  }
  
  if (args[0] == 'aç') {
    if(db.has(`korumaacik_${message.guild.id}`)) return message.reply(`Koruma Sistemi Zaten Açık. Kapatmak İçn **${prefix}koruma kapat**`)
    message.channel.send(`Koruma Sistemi Aktifleştirildi. Kapatmak için **${prefix}koruma kapat**`)
  message.react(":white_check_mark:");   
    db.set(`korumaacik_${message.guild.id}`, 'acik')
  }
  if(args[0] == 'kapat') {
    if(!db.has(`korumaacik_${message.guild.id}`)) return message.reply(`Koruma Sistemi Zaten Kapalı. Açmak İçin **${prefix}koruma aç**`)
    message.channel.send(`Koruma Sistemi Kapatıldı. Açmak için **${prefix}koruma aç**`)
  message.react(":negative_squared_cross_mark:");   
    db.delete(`korumaacik_${message.guild.id}`)
    
  } else if(args[0] == "kanal") {
    if(!db.has(`korumaacik_${message.guild.id}`)) return message.reply("koruma sistemi kapalıyken kanal ayarlayamazsın");  
    let kanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name.replace("-" , " ").toLowerCase().includes(args[1])) || message.guild.channels.get(args[1]) || message.guild.channels.id();
    if(!kanal) return message.reply("Koruma kanalını ayarlamam için bir kanal girmeniz gereklidir. Kanalı etiketleyebilir veya ismini girebilirsiniz."); else {
      await db.set(`korumalog_${message.guild.id}`, kanal.id);
      message.reply("koruma-log kanalı başarıyla " + kanal + " olarak ayarlandı.");
     message.react(":white_check_mark:");   
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'koruma'
}