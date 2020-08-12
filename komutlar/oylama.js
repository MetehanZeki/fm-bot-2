const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      "Bu komutu kullanabilmek için **ADMINISTRATOR** yetkisi gerekir"
    );

 
  let question = args.join(" ");
  if (!question)
    return message.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("⛔ __Doğru Kullanım__ ⛔", `=> oylama **mesaj**`)
    );


  message.channel.send(
    `everyone - here atılsın mı?\n**evet** veya **hayır** olarak cevap veriniz. \nKalan süre 10 saniye`
  );

  message.channel
    .awaitMessages(response => response.content === "evet", {
      max: 1,
      time: 10000,
      errors: ["time"]
    })

    .then(collected => {
      message.channel
        .sendEmbed(
          new Discord.RichEmbed()
            .setColor("BLUE")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setFooter("Oylama Var! Katılmayı Unutmayın!", client.user.avatarURL)
            .addField(`** __OYLAMA__**`, `=> **${question}** `)
        )
        .then(function(message) {
          message.react("✅").then(sıra => {
            message.react("⛔");
          });
        })
        .then(everyone => {
          message.channel.send(" @everyone @here ").then(m => m.delete(50));
        });
    });
  message.channel
    .awaitMessages(response => response.content === "hayır", {
      max: 1,
      time: 10000,
      errors: ["time"]
    })
    .then(collected => {
      message.channel
        .sendEmbed(
          new Discord.RichEmbed()
            .setColor("BLUE")
            .setThumbnail(message.author.avatarURL)
            .setTimestamp()
            .setFooter("= = Oylama Var! = =", client.user.avatarURL)
            .addField(`⁉️ __OYLAMA__ ⁉️`, `=> **${question}** `)
        )
        .then(function(message) {
          message.react("✅").then(sıra => {
            message.react("⛔");
          });
        });
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["anket"],
  permLevel: 0
};
exports.help = {
  name: "oylama",
  description: "Oylama yapar.",
  usage: "oylama"
};
