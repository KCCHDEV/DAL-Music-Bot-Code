const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { createBar } = require("../../handlers/functions");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  // options
  name: "nowplaying",
  description: `รับข้อมูลเพลงปัจจุบัน`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} ไม่มีการเล่น **`);
    } else {
      let song = queue.songs[0];
      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(song.thumbnail)
            .setAuthor({
              name: `Now Playing`,
              iconURL: song.url,
              url: song.url,
            })
            .setDescription(
              `>>> ** [${song.name}](${song.url}) ** \n\n ${createBar(queue)}`
            )
            .addFields([
              {
                name: `** ${emoji.time} Duration **`,
                value: `>>> ${song.formattedDuration}`,
                inline: true,
              },
              {
                name: `** ${emoji.song_by} Requested By **`,
                value: `>>> ${song.user}`,
                inline: true,
              },
              {
                name: `** ${emoji.bot} Author **`,
                value: `>>> ${song.uploader.name}`,
                inline: true,
              },
              {
                name: `** ${emoji.raise_volume} Volume: **`,
                value: `>>> ${queue.volume}%`,
                inline: true,
              },
              {
                name: `** ⬇️ Download: **`,
                value: `>>> [Download Now](${song.streamURL})`,
                inline: true,
              },
            ])
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    }
  },
});
