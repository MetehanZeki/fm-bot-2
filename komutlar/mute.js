const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms')

exports.run = async(client,message,args) => {

 var rol = await db.fetch(`muteyetkilirol_${message.guild.id}`, rol)
let rol2 = message.guild.roles.find('id', rol)
if(!message.member.roles.has(db.fetch(`muteyetkilirol_${message.guild.id}`, rol))) return message.channel.send(new Discord.RichEmbed().setColor('ff0000')
.setDescription("Bu Komutu Kullanmak İçin mute yetkili rolde bulunmanız gerekmektedir \n henüz ayarlı değilse : `fm!mute-yetkili-rol @rol`"));

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let sebep = args[2]
  if(!tomute) return message.reply("🚫| Yanlış komut!\n✔| Doğru Kullanım:  ``fm!mute <@Kullanıcı> <Süre> <sebep>`` Olarak Yazmalısınız.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("🚫 Bu kullanıcıyı muteleyemem. \nSebepleri Şunlar Olabilir;\n  🚫| Bu kullanıcının rolü benim rolümden yüksek olabilir,\n  🚫| Kullanıcı ben olabilirim,\n  🚫| Kullanıcı ile aynı rolde olabiliriz.")
let muterole = message.guild.roles.find(r => r.name === "Mute | Susturulmuş");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Mute | Susturulmuş",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply("🚫 | Yanlış komut!\n✔| Doğru Kullanım:  ``fm!sustur <@Kullanıcı> <Süre> <sebep>`` Olarak Yazmalısınız.");

  await(tomute.addRole(muterole.id));
  message.reply(`**:white_check_mark:| Başarılı**\n\n✔| <@${tomute.id}> Kullanıcı başarılı şekilde mutelendi. \n✔| Mute süresi; ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`:white_check_mark: | <@${tomute.id}> Kişinin susturulma süresi doldu!\n:white_check_mark: | \`Mute | Susturulmuş\` rolü alındı!`);
  }, ms(mutetime));
  //message.channel.find("va-log")

 let user = message.mentions.users.first();

 let mutelog = db.get(`mutelog_${message.guild.id}`)
const mute_log = client.channels.get(mutelog);
    mute_log.send(
new Discord.RichEmbed()
    .setColor('BLUE')
    .setTimestamp()
    .addField('Eylem:', 'Mute atma')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', sebep)
)

  }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sustur","chatmute","chat-mute"],
    permLevel: 2
  };
  
  exports.help = {
    name: "mute",
  category: 'Mod',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar <@kişi-etiket> <sebep>'
};