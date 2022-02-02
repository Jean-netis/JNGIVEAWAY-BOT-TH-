const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ ถือขึ้นคุณเพียงแค่ลบปฏิกิริยาจากการแจก?')
        .setColor("#2F3136")
        .setDescription(
          `การเข้าสู่ [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) ถูกบันทึกแต่คุณไม่มีปฏิกิริยาเนื่องจากคุณไม่ต้องการ **${giveaway.prize}** ฉันจะต้องเลือกคนอื่น 😭`
        )
        .setFooter("คิดว่ามันเป็นความผิดพลาดเหรอ? ไปตอบสนองอีกครั้ง!")
      ]
    });

  }
}