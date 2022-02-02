module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
 const messages = require("../utils/message");
  let time = "";
  let winnersCount;
  let prize = "";
  let channel = "";
  const msg = await message.reply("🎉 ไม่เป็นอะไร! มาตั้งค่าการแจกของคุณกันเถอะ! อย่างแรกคุณต้องการแจกของรางวัลในช่องใด?" + `\n\nคุณสามารถยกเลิกการแจกนี้ได้โดยพิมพ์ \`cancel\` ในการแชท`)
  let xembed = new Discord.MessageEmbed()
    .setTitle("อ๊ะ! ดูเหมือนว่าเราจะพบกับระยะหมดเวลา! 🕖")
    .setColor("#FF0000")
    .setDescription('💥 จับโชคของเรา!\nคุณใช้เวลาในการตัดสินใจมากเกินไป!\nใช้ ``create`` อีกครั้งเพื่อเริ่มแจกใหม่!\nพยายามที่จะตอบสนองภายใน **30 s** เวลานี้!' + `\n\nคุณสามารถยกเลิกการแจกนี้ได้โดยพิมพ์ \`cancel\` ในการแชท`)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

  const filter = m => m.author.id === message.author.id && !m.author.bot
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  })

  collector.on("collect", async collect => {

    const response = collect.content
    if(response == "cancel"){
      return collector.stop(msg.reply(`ยกเลิกการแจกของรางวัล`))
    }
    let chn =
      collect.mentions.channels.first() ||
      message.guild.channels.cache.get(response)
    if (!chn) {
      return msg.edit("เอ่อโอ้! ดูเหมือนว่าคุณระบุช่องที่ไม่ถูกต้อง!\n**Try Again?**\n ตัวอย่าง: ``#giveaways``, ``677813783523098627``"+ `\n\nคุณสามารถยกเลิกการแจกนี้ได้โดยพิมพ์ \`cancel\` ในช่องแชท`)
    } else {
      channel = chn
      collector.stop(
        msg.edit(`🎉 ดีเลย! ของแจกจะอยู่ใน ${channel}! ต่อไป,ของรางวัลนี้ควรอยู่นานแค่ไหน?`+ `\n\nคุณสามารถยกเลิกการแจกนี้ได้โดยพิมพ์ \`cancel\` ในช่องแชท`)
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {
      if(collect2.content == "cancel"){
      return collector2.stop(msg.reply(`ยกเลิกการแจกของรางวัล`))
    }

      let mss = ms(collect2.content);
      if (!mss) {
        return msg.edit(
            "อ๊ะ ! ดูเหมือนว่าคุณให้ระยะเวลาที่ไม่ถูกต้องกับฉัน\n**ลองอีกครั้ง?**\n ตัวอย่าง: ``10 minutes``,``10m``,``10``"+ `\n\nคุณสามารถยกเลิกการแจกนี้ได้โดยพิมพ์ \`cancel\` ในช่องแชท`
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit(
              `🎉 Neat! Next, how many winners should participate in this giveaway? `+ `\n\nYou may cancel this giveaway by typing \`cancel\` in chat`
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {
        const response3 = collect3.content.toLowerCase()
        if(response3 == "cancel"){
      return collector3.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit(
           
              "Boi! Winners Must Be A Number or greater than equal to one!\n**Try Again?**\n Example ``1``,``10``, etcetra."+ `\n\nYou may cancel this giveaway by typing \`cancel\` in chat`
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit(
                `🎉 Alright, Generous Human! Next, What should be the prize for this giveaway?`+ `\n\nYou may cancel this giveaway by typing \`cancel\` in chat`
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          if(response4 == "cancel"){
      return collector4.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }
          prize = response4;
                collector4.stop(
                  msg.edit(
                    (`🎉 Done the giveaway for \`${prize}\` is starting in ${channel}! which will last for **${ms(
                        time,
                        { long: true }
                      )}** and there will be **${winnersCount}** winner(s)!`
                    )
                  )
                )
                await collect.delete()
                await collect2.delete()
                await collect3.delete()
                await collect4.delete()
                
                client.giveawaysManager.start(channel, {
                  duration: parseInt(time),
                  prize: prize,
                  hostedBy: client.config.hostedBy ? message.author : null,
                  winnerCount: parseInt(winnersCount),
                  messages
                })
              });
          });
        });
      });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed]})
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
         message.reply({ embeds: [xembed]})

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

         message.reply({ embeds: [xembed]})
      }
    })
    collector5.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed]})
      }
    })
  } catch (e) {

  }
} 
