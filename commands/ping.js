const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("กำลังส่งคำขอไปที่ websocket...")
  let pong = new Discord.MessageEmbed()
    .setAuthor(`🏓 โป่ง!`, message.author.displayAvatarURL)
    .setTitle("ping ของบอท")
    .setColor('#2F3136')	
    .setTimestamp()
    .addField("เวลาในการตอบสนอง", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("เวลาในการตอบสนองของ API", `${Math.round(client.ws.ping)}ms`, true)
    .setFooter(`การร้องขอจาก ${message.author.tag}`, message.author.displayAvatarURL());
     m.delete()
  message.reply({ content: " ", embeds: [pong] })
}