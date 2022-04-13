const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "volume",
  description: ` ตั้งค่าความระดับเสียง`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "amount",
      description: `ระบุค่าาความดัง`,
      type: "NUMBER",
      required: true,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let channel = interaction.member.voice.channel;
    let queue = await player.getQueue(interaction.guild.id);
    if (!channel) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน **`
      );
    } else if (
      interaction.guild.me.voice.channel &&
      !interaction.guild.me.voice.channel.equals(channel)
    ) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} ต้องเข้ามาในห้องเสียงที่มีผม **`
      );
    } else if (interaction.guild.me.voice.serverMute) {
      return client.embed(
        interaction,
        `** ${emoji.ERROR} ผมโดนปิดเสียง เปิดเสียงผมก่อน **`
      );
    } else if (!queue) {
      return interaction.followUp(`** ${emoji.ERROR} ไม่มีการเล่น **`);
    } else if (check_dj(client, interaction.member, queue.songs[0])) {
      return interaction.followUp(
        `** ${emoji.ERROR} คุณไม่ใช่ดีเจและไม่ใช่ผู้ขอเพลง **`
      );
    } else {
      let volume = interaction.options.getNumber("amount");
      if (volume > 500) {
        return interaction.followUp(
          `** ${emoji.ERROR} สามารถตั้งค่าความดัง 1 - 500 **`
        );
      } else {
        await queue.setVolume(volume);
        interaction.followUp(
          `** ${emoji.SUCCESS} ค่าความดัง Set เป็น ${queue.volume}% **`
        );
      }
    }
  },
});
