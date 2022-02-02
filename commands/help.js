
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new MessageEmbed()
.setTitle(`คำสั่งของบอท ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**กรุณาเลือกหมวดหมู่ของบอทด้วยนะ**')
.addField(`Links:`,`- [Youtube Channel](https://www.youtube.com/channel/UC1m8JxBoeuvXnryjCgvgyew)\n- [Discord Server](https://discord.gg/yKnHY2ZG3k)\n- [DISCORD SERVER](ใส่สิงค์คำเชิณเข้าเชิฟตรงนี้)`,true)
.setTimestamp()
.setFooter(`Requested by ${message.author.username} | GiveawayBot™ v1 By JN`, message.author.displayAvatarURL());

  const giveaway = new MessageEmbed()
  .setTitle("คำสั่งบอท » การ GIVEAWAY")
  .setColor('#2F3136')
  .setDescription("```yaml\nนี้คือคำสั่งทั่งหมดของฉัน :```")
  .addFields(
    { name: 'Create / Start'  , value: `เริ่มการ Giveaway\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Edit' , value: `แก้ไขการ Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'End' , value: `จบการ Giveway นี้!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'List' , value: `แสดงการ Giveway ทั่งหมดของเชิฟนี้!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Pause' , value: `หยุดการ Giveaway นี้ชีวคราว!\n > **Type: __\`slash\`__**`, inline: true },
    { name: 'Reroll' , value: `สุ่มใหม่!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Resume' , value: `เริ่มการ Giveaway ต่อ (คำสั่งนี้ต้องใช้หลัง Pause )!\n > **Type: __\`slash\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username} | GiveawayBot™ v1 By JN`, message.author.displayAvatarURL());


  const general = new MessageEmbed()
  .setTitle("คำสั่งบอท » ทั่งไป")
  .setColor('#2F3136')
  .setDescription("```yaml\nนี้คือคำสั่งทั่งหมดของฉัน:```")
  .addFields(
    { name: 'Help'  , value: `แสดงคำสั่งทั่งหมดของบอท!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Invite' , value: `ให้บอทส่งลิงค์คำเชิญบอทให้คุณ! [ปิดชั่วคราว]\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Ping' , value: `แสดงค่า Ping ของบอท [ PING PONG ]\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username} | GiveawayBot™ v1 By JN`, message.author.displayAvatarURL());

  const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("กรุณาเลือกหมวดหมู่ของบอทด้วยนะ")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `View all the giveaway based commands!`,
                emoji: `🎉`
            },
            {
                label: `General`,
                value: `general`,
                description: `View all the general bot commands!`,
                emoji: `⚙`
            }
        ])
    ),
];

const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                time: 300000
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) });
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) });
            }
        });
        collector.on('end', () => {
          initialMessage.edit({ components: components(true) });
      }
      )
}
