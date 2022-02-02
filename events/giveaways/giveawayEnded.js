const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 ยินดีด้วย`)
          .setColor("#2F3136")
          .setDescription(`สวัสดี ${member.user}\n ฉันได้ยินมาว่าคุณมีวู้n **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n งานที่ดีในการชนะ **${giveaway.prize}!**\nส่งข้อความโดยตรงไปยังโฮสต์เพื่อรับรางวัลของคุณ!!`)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      });
    });

  }
}