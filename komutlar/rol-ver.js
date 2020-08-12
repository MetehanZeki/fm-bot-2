const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

const moment = require('moment');

exports.run = async (client, message, args, func, msg) => {
             if (!message.member.hasPermission("ADMINISTRATOR")) {
  const bilgi = new Discord.RichEmbed()
  .setDescription('Bu komutu kullanabilmek için **Yönetici** iznine sahip olman gerek.')
  .setColor('BLUE')
return message.channel.sendEmbed(bilgi).then(m => m.delete(150000)); return
       }
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  let rolx = message.mentions.roles.first() || message.guild.roles.find(s => s.name === args[1]) || message.guild.roles.find(s => s.id === args[1])
        let banlog = db.fetch(`modlogkanaly_${message.guild.id}`)
    let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
    if (!banlog) return message.channel.send(`<a:Kirmizi:732601516770328617> Hata! Mod log ayarlanmamış! <a:Kirmizi:732601516770328617>\n<a:renkli_ok:732601512932409435> Ayarlamak için: **${prefix}mod-log**`)
  if (!user) return message.reply('<a:Kirmizi:732601516770328617> Hata! Rol verilecek kullanıcıyı etiketlemelisin. <a:Kirmizi:732601516770328617>')
  if (!rolx) return message.reply('<a:Kirmizi:732601516770328617> Hata! Kullanıcıya verilecek rolün ismini eksiksiz giriniz. <a:Kirmizi:732601516770328617>');
  
    if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Kullanıcının rolleri senin rollerinden daha yüksek.`);
		}
  
  user.addRole(rolx.id);
  
            let modlog = message.guild.channels.get(db.fetch(`modlogkanaly_${message.guild.id}`).replace("<#", "").replace(">", ""));
      const embeds = new Discord.RichEmbed()
      .setTimestamp()
      .setColor('BLUE')
      .setFooter(client.user.username, client.user.avatarURL)
      .setAuthor(`${user.user.tag} isimli kullanıcıya rol verildi!`, user.user.avatarURL)
      .setThumbnail(message.author.avatarURL)
      .addField('Rol verilen kullanıcı bilgileri', `Kullanıcı etiket: **${user}**\nKullanıcı tag: **${user.user.tag}**\nKullanıcı id: **${user.user.id}**`)
      .addField('Rol veren yetkili bilgileri', `Yetkili etiket: **${message.author}**\nYetkili tag: **${message.author.tag}**\nYetkili id: **${message.author.id}**`)
      .addField('Kullanıcıya verilen rol bilgileri', `Kullanıcıya verilen rol: ${rolx}`)
   modlog.send(embeds)
  
                 const embed = new Discord.RichEmbed()
            .setColor("BLUE")
            .setAuthor(`${user.user.username} kullanıcısına rol verildi!`, user.user.avatarURL)
            .setDescription(`<a:yuvarlak_tik:732601536743604284> **${user.user.tag}** isimli kullanıcıya ${rolx} rolü verildi! <a:yuvarlak_tik:732601536743604284>`)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL)
            return message.channel.send(embed)
  

 };

exports.conf = {
  enabled: true,
  guildOnly: true,
  kategori: 'yetkili',
  aliases: ["rol-ver","rv","r-v"],
  permLevel: 0
};

exports.help = {
  name: 'rol-ver',
  description: 'İstediğiniz kişiyi istediğiniz rolü verir.',
  usage: 'rol-ver [kullanıcı] [@rol]'
};