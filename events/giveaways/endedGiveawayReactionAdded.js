const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**อ๊ายยย ดูเหมือนว่าของแถมจะจบลงแล้ว!**`)
  }
}