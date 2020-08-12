const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
 if(db.fetch(`bakim`)) return message.channel.send('Şuanda Bakım Modu Açıktır.')
    if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
  
    if (!args[0]) return message.channel.send(':no_entry: Sistemi kullanabilmek için: `!reklamkick aç veya kapat`')
    if (args[0] == 'aç') {
        db.set(`reklamkick_${message.guild.id}`, 'acik')
        message.channel.send(`Reklam kick sistemi açıldı. Reklam yapanlar 3 uyarıdan sonra banlanıcaktır.`)
  message.react(":white_check_mark:");   
    }
    if (args[0] == 'kapat') {
        db.set(`reklamkick_${message.guild.id}`, 'kapali')
        message.channel.send(`Reklam kick sistemi kapatıldı`)
  message.react(":negative_squared_cross_mark:");   
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reklam-kick'],
    permLevel: 0
};
exports.help = {
    name: 'reklamkick',
    description: 'Reklam kick sistemini açıp kapatır',
    usage: 'reklamkick aç/kapat'
};//Bu altyapı TlhaMert youtube kanalına aittir çalınmış ise lütfen info@doxybot.xyz adresine mail atın.
