const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const config = require("../../settings/config.json");
const emoji = require("../../settings/emoji.json");
const player = require("../../handlers/player");
const { check_dj } = require("../../handlers/functions");

module.exports = new Command({
  // options
  name: "loop",
  description: `เล่นเพลงซ้ำ คิว/เพลง`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 5,
  DJ: true,
  options: [
    {
      name: "loopmode",
      description: `เลือกระบบ`,
      type: "STRING",
      required : true,
      choices: [
        {
          name: "Track",
          value: `1`,
        },
        {
          name: "Queue",
          value: `2`,
        },
        {
          name: "Off",
          value: `0`,
        },
      ],
    },
  ],
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
        `** ${emoji.ERROR} ต้องเข้ามาในห้องเสียงที่มีผม **`
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
    } else {
      let loopmode = Number(interaction.options.getString("loopmode"));
      await queue.setRepeatMode(loopmode);
      if (queue.repeatMode === 0) {
        return client.embed(
          interaction,
          `** ${emoji.ERROR} Loop ปิด!! **`
        );
      } else if (queue.repeatMode === 1) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Song Loop เปิด!! **`
        );
      } else if (queue.repeatMode === 2) {
        return client.embed(
          interaction,
          `** ${emoji.SUCCESS} Queue Loop เปิด!! **`
        );
      }
    }
  },
});
