const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
const emoji = require("../../settings/emoji.json");
const config = require("../../settings/config.json");
const { check_dj } = require("../../handlers/functions");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { default: DisTube, Queue } = require("distube");
const player = require("../../handlers/player");

module.exports = new Command({
  // options
  name: "filter",
  description: `เพิ่ม filters ในเพลง`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Filters",
  cooldown: 10,
  options: [
    {
      name: "8d",
      description: `เพิ่ม 8D filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "bassboost",
      description: `เพิ่ม Bassboost filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "clear",
      description: `ลบ filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "earrape",
      description: `เพิ่ม earrape filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "flanger",
      description: `เพิ่ม flanger filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "gate",
      description: `เพิ่ม gate filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "haas",
      description: `เพิ่ม haas filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "heavybass",
      description: `เพิ่ม heavybass filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "karaoke",
      description: `เพิ่ม karaoke filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "lightbass",
      description: `เพิ่ม lightbass filte`,
      type: "SUB_COMMAND",
    },
    {
      name: "mcompad",
      description: `เพิ่ม mcompad filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "nightcore",
      description: `เพิ่ม nightcore filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "phaser",
      description: `เพิ่ม phaser filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "pulsator",
      description: `เพิ่ม pulsator filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "purebass",
      description: `เพิ่ม purebass filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "reverse",
      description: `เพิ่ม reverse filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "subboost",
      description: `เพิ่ม subboost filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "surround",
      description: `เพิ่ม surround filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "treble",
      description: `เพิ่ม treble filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "tremolo",
      description: `เพิ่ม tremolo filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "vaporware",
      description: `เพิ่ม vaporware filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "vibrato",
      description: `เพิ่ม vibrato filter`,
      type: "SUB_COMMAND",
    },
    {
      name: "custombassboost",
      description: `เพิ่ม custombassboost filter`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: "ระดับ bass 0-20",
          type: "NUMBER",
          required: true,
        },
      ],
    },
    {
      name: "customspeed",
      description: `เพิ่ม customspeed filter`,
      type: "SUB_COMMAND",
      options: [
        {
          name: "amount",
          description: "ค่าความเร็ว 0-2",
          type: "NUMBER",
          required: true,
        },
      ],
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    const [subcmd] = args;
    switch (subcmd) {
      case "8d":
        {
          setFilter(client, interaction, player, "8d");
        }
        break;
      case "bassboost":
        {
          setFilter(client, interaction, player, "bassboost");
        }
        break;
      case "clear":
        {
          setFilter(client, interaction, player, false);
        }
        break;
      case "earrape":
        {
          setFilter(client, interaction, player, "earrape");
        }
        break;
      case "flanger":
        {
          setFilter(client, interaction, player, "flanger");
        }
        break;
      case "gate":
        {
          setFilter(client, interaction, player, "gate");
        }
        break;
      case "hass":
        {
          setFilter(client, interaction, player, "hass");
        }
        break;
      case "heavybass":
        {
          setFilter(client, interaction, player, "heavybass");
        }
        break;
      case "karaoke":
        {
          setFilter(client, interaction, player, "karaoke");
        }
        break;
      case "lightbass":
        {
          setFilter(client, interaction, player, "lightbass");
        }
        break;
      case "mcompad":
        {
          setFilter(client, interaction, player, "mcompad");
        }
        break;
      case "nightcore":
        {
          setFilter(client, interaction, player, "nightcore");
        }
        break;
      case "phaser":
        {
          setFilter(client, interaction, player, "phaser");
        }
        break;
      case "pulsator":
        {
          setFilter(client, interaction, player, "pulsator");
        }
        break;
      case "purebass":
        {
          setFilter(client, interaction, player, "purebass");
        }
        break;
      case "reverse":
        {
          setFilter(client, interaction, player, "reverse");
        }
        break;
      case "subboost":
        {
          setFilter(client, interaction, player, "subboost");
        }
        break;
      case "surround":
        {
          setFilter(client, interaction, player, "surround");
        }
        break;
      case "treble":
        {
          setFilter(client, interaction, player, "treble");
        }
        break;
      case "tremolo":
        {
          setFilter(client, interaction, player, "tremolo");
        }
        break;
      case "vaporware":
        {
          setFilter(client, interaction, player, "vaporware");
        }
        break;
      case "vibrato":
        {
          setFilter(client, interaction, player, "vibrato");
        }
        break;
      case "custombassboost":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** ต้องเข้าห้องเสียงก่อน **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** ต้องเข้ามาใน __ ห้องที่มีผมอยู่ __ **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} ไม่มีการเล่นในตอนนี้ **`
            );
          } else if (bass > 20 || bass < 0) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} BassBoost ใส่ค่าได้ > 0 - 20 **`
            );
          } else {
            let fns = `bass=g=${bass},dynaudnorm=f=200`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      case "customspeed":
        {
          let channel = interaction.member.voice.channel;
          let bass = interaction.options.getNumber("amount");
          let queue = player.getQueue(interaction.guild.id);
          if (!channel) {
            return client.embed(
              interaction,
              `** ต้องเข้าห้องเสียงก่อน **`
            );
          } else if (
            interaction.guild.me.voice.channel &&
            !interaction.guild.me.voice.channel.equals(channel)
          ) {
            return client.embed(
              interaction,
              `** ต้องเข้ามาใน __ ห้องที่มีผมอยู่ __ **`
            );
          } else if (!queue.playing) {
            return client.embed(
              interaction,
              `** ${emoji.msg.ERROR} ไม่มีการเล่นในตอนนี้ **`
            );
          } else if (bass <= 0 || bass > 2) {
            return client.embed(
              interaction,
              ` ** ${emoji.msg.ERROR} speed Limit คือ 0 - 2 **`
            );
          } else {
            let fns = `atempo=${bass}`;
            setFilter(client, interaction, player, fns);
          }
        }
        break;
      default:
        break;
    }
  },
});

/**
 *
 * @param {Client} client
 * @param {CommandInteraction} interaction
 * @param {DisTube} player
 * @param {Queue} queue
 * @param {String} filter
 * @returns
 */
async function setFilter(client, interaction, player, filter) {
  let channel = interaction.member.voice.channel;
  let queue = player.getQueue(interaction.guild.id);
  if (!channel) {
    return client.embed(interaction, `** ต้องเข้าห้องเสียงก่อน **`);
  } else if (
    interaction.guild.me.voice.channel &&
    !interaction.guild.me.voice.channel.equals(channel)
  ) {
    return client.embed(
      interaction,
      `** ต้องเข้ามาใน __ ห้องที่มีผมอยู่ __ **`
    );
  } else if (!queue) {
    return client.embed(
      interaction,
      `** ${emoji.ERROR} ไม่มีการเล่นในตอนนี้ **`
    );
  } else if (check_dj(client, interaction.member, queue.songs[0])) {
    return interaction.followUp(
      `** ${emoji.ERROR} ต้องมีสิทธิ์ Dj Rols**`
    );
  } else {
    await queue.setFilter(filter);
    return client.embed(
      interaction,
      `** ${emoji.SUCCESS} เพิ่ม \`${filter}\` Filter**`
    );
  }
}
