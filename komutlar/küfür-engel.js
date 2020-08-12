const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
 if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açıktır.')
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Yetkiniz Bulunmamaktadır!');

    if (!args[0]) return message.reply(`aç/kapat`);

    if (args[0] == 'aç') {
        var durum = await db.fetch(`küfür_${message.guild.id}`)            
        if (durum == "acik") return message.channel.send("Önceden Açılmış Bir Şeyi **Şimdi** __Açamazsın!__");
        db.set(`küfür_${message.guild.id}`, 'acik')
        message.channel.send(`Küfür engel sistemi açılmıştır . `)
        message.react(":white_check_mark:");
    }

    if (args[0] == 'kapat') {
        var durum = await db.fetch(`küfür_${message.guild.id}`)            
        if (durum == "kapali") return message.channel.send("Önceden Kapanmış Bir Şeyi **Şimdi** __Kapatamazsın!__");
        db.set(`küfür_${message.guild.id}`, 'kapali')
        message.channel.send(`Küfür engel sistemi kapatılmıştır.`)
         message.react(":negative_squared_cross_mark:");
    }

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 3
};
exports.help = {
  name: 'küfür-engel',
  description: '',
  usage: 'küfür-engel'
};//Bu altyapı TlhaMert youtube kanalına aittir çalınmış ise lütfen info@doxybot.xyz adresine mail atın.
