const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 ไปกันเถอะ! เรามีผู้ชนะคนใหม่`)
          .setColor("#2F3136")
          .setDescription(`Hello there ${member.user}\n ฉันได้ยินมาว่าเจ้าภาพโทรกลับและคุณชนะ **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n งานที่ดีในการชนะ **${giveaway.prize}!**\nส่งข้อความโดยตรงกับโฮสต์เพื่อรับรางวัลของคุณ!!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      });
    });
  }
}