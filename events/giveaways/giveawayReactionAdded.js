const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("อนุมัติแล้ว! | คุณมีโอกาสที่จะชนะ!!")
    .setDescription(
      `คุณได้เข้วรวม [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ได้รับอนุมัติแล้ว!`
    )
    .setFooter("Subscribe to JN_WORLD on YT!")
    .setTimestamp()
   let denied =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle(":x: |ที่ถูกปฏิเสธ ไม่พบ Databse Entery & ส่งคืน!")
    .setDescription(
      `คุณได้เข้าร่วม [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ถูกปฏิเสธโปรดตรวจสอบข้อกําหนดในการแจกของรางวัลอย่างถูกต้อง`
    )
    .setFooter("Subscribe to JN_WORLD on YT!")

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          });
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        });
      }

      return reactor.send({
        embeds: [approved]
      });
    } else {
        return reactor.send({
          embeds: [approved]
        });
    }
    }
  }
