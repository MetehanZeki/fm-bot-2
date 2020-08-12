const Discord = require('discord.js');


exports.run = function(client, message, embed, params) {
  const bymayfe = new Discord.RichEmbed()

  .setColor('RED')
  .setImage('https://api.alexflipnote.dev/supreme?text='+ client.ping +'%20Ping')

    message.channel.send(bymayfe);

};   
  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['p', 'ms'],
  permLevel: 0 
};

exports.help = {
  name: 'ping', 
  description: 'Botun pingini gösterir',
  usage: 'ping'
};