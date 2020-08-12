const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (client, message, args) => {
  
  if(message.author.id != "424492496899538944") return
  
  if(!args[0]) return message.channel.send('Bakım modunu açmak için fm!bakım aç')
  
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten açık')
    message.channel.send('Bakım modu açıldı.')
    db.set(`bakim`, 'acik')
    message.react(":gear:");
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten kapalı.')
    message.channel.send('Bakım modu kapatıldı.')
    db.delete(`bakim`)
    message.react(":white_check_mark:");
  }
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'bakım'
}
