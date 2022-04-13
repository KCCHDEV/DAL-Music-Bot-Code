const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj  } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "pause",
  description: `หยุดเพลงชั่วคราว`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return interaction.followUp(
        `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return interaction.followUp(
        `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return interaction.followUp(
        `** ${emoji.ERROR} ผมโดนปิดเสียง เปิดเสียงผมก่อน **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} ไม่มีการเล่น **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} คุณไม่ใช่ดีเจและไม่ใช่ผู้ขอเพลง **`
      );
    } else if (queue.paused) {
      return interaction.followUp(`** ${emoji.ERROR} เพลงหยุดอยู่แล้ว **`);
    } else {
      await queue.pause();
      interaction.followUp(`** ${emoji.pause} หยุดเพลง **`);
    }
  },
});
