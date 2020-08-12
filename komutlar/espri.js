const Discord = require('discord.js');
const { get } = require('snekfetch');

exports.run = async (client, message) => {
  const espri = await get('https://api.emirkabal.com/espri').set('Authorization', '.');
  if (!espri || !espri.body || !espri.body.mesaj) return console.log("Hata oluştu,Lütfen API anahtarınızı kontrol ediniz.");
  message.channel.send(espri.body.mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['espiri', 'espri-yap'],
  permLevel: 0
};

exports.help = {
  name: 'espri',
  description: 'Espri yapar.',
  usage: 'espri'
};