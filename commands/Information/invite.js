const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const { MessageEmbed } = require("discord.js");
const emoji = require('../../settings/emoji.json')

module.exports = new Command({
  // options
  name: "invite",
  description: `invite link ของ DAL Music`,
  userPermissions: ['SEND_MESSAGES'],
  botPermissions: ['SEND_MESSAGES'],
  category: "Information",
  cooldown: 10,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    interaction.followUp({embeds : [
        new MessageEmbed()
        .setColor(ee.color)
        .setTitle(` 💌 ขอบคุรที่เชิญผม`)
        .setDescription(`>>> ** [กดตรงนี้](https://discord.com/api/oauth2/authorize?client_id=915021697688666123&permissions=140428738001&scope=bot%20applications.commands) **`)
        .setImage(`https://cdn.discordapp.com/attachments/950770133972971558/965274631634288801/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg`)
        .setFooter({text : ee.footertext , iconURL : ee.footericon})
    ]})
  },
});
