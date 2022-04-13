const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "dj",
  description: `ตั้งค่า Dj`,
  userPermissions: ["MANAGE_ROLES"],
  botPermissions: ["MANAGE_ROLES"],
  category: "Config",
  cooldown: 10,
  options: [
    {
      name: "set",
      description: `set dj role ใน Server`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: `เลือก Role ที่ต้องการ`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: `remove dj role ใน Server`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "role",
          description: `เลือก Role ที่ต้องการ`,
          type: "ROLE",
          required: true,
        },
      ],
    },
    {
      name: "show",
      description: `ดู dj roles ทั้งหมดใน server`,
      type: "SUB_COMMAND",
    },
    {
      name: "djonly",
      description: `ดูเฉพาะ dj ใน server`,
      type: "SUB_COMMAND",
    },
    {
      name: "reset",
      description: `ลบ dj roles ทั้งหมดใน server`,
      type: "SUB_COMMAND",
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let subcmd = interaction.options.getSubcommand();
    switch (subcmd) {
      case "set":
        {
          let role = interaction.options.getRole("role");
          client.settings.push(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS} เพิ่ม ${role} เป็น DJ Role **`
          );
        }
        break;
      case "remove":
        {
          let role = interaction.options.getRole("role");
          client.settings.remove(interaction.guild.id, role.id, "djroles");
          interaction.followUp(
            `>>> ** ${emoji.SUCCESS} ลบ ${role} ออกจาก DJ Role **`
          );
        }
        break;
      case "show":
        {
          let djroleids = client.settings.get(interaction.guild.id, "djroles");
          if (djroleids === []) {
            return interaction.followUp(`>>> **  ไม่พบ DJ Role **`);
          } else {
            let data = [...djroleids];
            let string = await data.map((roleid, index) => {
              let role = interaction.guild.roles.cache.get(roleid);
              return `${role}`;
            });
            interaction.followUp({
              embeds: [
                new MessageEmbed()
                  .setColor(ee.color)
                  .setTitle(`** DJ roles ทั้งหมดของ ${interaction.guild.name} **`)
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                  .setDescription(
                    `>>> ${
                      string.join(" ' ").substr(0, 3000) ||
                      `** ไม่พบ DJ Role **`
                    }`
                  )
                  .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
              ],
            });
          }
        }
        break;
      case "djonly":
        {
          let data = await client.settings.get(interaction.guild.id, "djonly");
          if (data === false) {
            client.settings.set(interaction.guild.id, true, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly เปิด **`
            );
          } else if (data === true) {
            client.settings.set(interaction.guild.id, false, "djonly");
            return interaction.followUp(
              `** ${emoji.SUCCESS} DJonly ปิด **`
            );
          }
        }
        break;
      case "reset":
        {
          let data = await client.settings.get(interaction.guild.id, "djroles");
          client.settings.delete(interaction.guild.id, "djroles");
          if (data === []) {
            interaction.followUp(`** ${emoji.ERROR} ไม่พบ DJ Role **`);
          } else {
            interaction.followUp(
              `** ${emoji.SUCCESS} ลบ DJ Roles ทั้งหมดแล้ว **`
            );
          }
        }
        break;
      default:
        break;
    }
  },
});
