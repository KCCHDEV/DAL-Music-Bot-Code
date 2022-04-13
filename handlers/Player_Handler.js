const player = require("./player");
const ee = require("../settings/embed.json");
const emoji = require("../settings/emoji.json");
const {
  MessageEmbed,
  MessageButton,
  Client,
  ButtonInteraction,
} = require("discord.js");

const status = (queue) =>
  `ระดับเสียง: ${queue.volume}% • Filter: ${
    queue.filters.join(", ") || "Off"
  } • Status : ${queue.paused ? "หยุดการเล่น" : "กำลังเล่น"} • วน: ${
    queue.repeatMode ? (queue.repeatMode === 2 ? "Queue" : "Song") : "ปิด"
  } • Autoplay: ${queue.autoplay ? "เปิด" : "ปิด"}`;

/**
 * @param {Client} client
 */
module.exports = async (client) => {
  await player.setMaxListeners(25);
  try {
    // play song
    player.on("playSong", async (queue, song) => {
      if (!queue) return;
      client.updateplaymsg(queue);
      client.updatequeuemsg(queue);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      queue.textChannel
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(song.thumbnail)
              .setDescription(`>>> ** [\`${song.name}\`](${song.url}) **`)
              .addFields([
                {
                  name: `${emoji.song_by} สั่งการโดย`,
                  value: `>>> ${song.user}`,
                  inline: true,
                },
                {
                  name: `${emoji.time} ระยะเวลา`,
                  value: `>>> \`${song.formattedDuration}\``,
                  inline: true,
                },
              ])
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
          components: [client.buttons],
        })
        .then((msg) => {
          client.temp2.set(queue.textChannel.guild.id, msg.id);
        });
    });

    // add song
    player.on("addsong", async (queue, song) => {
      if (!queue) return;
      client.updatequeuemsg(queue);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      queue.textChannel
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({
                name: `เพิ่มเข้าคิว`,
                iconURL: song.user.displayAvatarURL({ dynamic: true }),
                url: song.url,
              })
              .setDescription(`>>> ** [\`${song.name}\`](${song.url}) **`)
              .addFields([
                {
                  name: `${emoji.song_by} สั่งงานโดย`,
                  value: `>>> ${song.user}`,
                  inline: true,
                },
                {
                  name: `${emoji.time} ระยะเวลา`,
                  value: `>>> \`${song.formattedDuration}\``,
                  inline: true,
                },
              ])
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => {});
          }, 5000);
        })
        .catch((e) => {});
    });

    // add list
    player.on("addList", async (queue, playlist) => {
      if (!queue) return;
      client.updatequeuemsg(queue);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      queue.textChannel
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setAuthor({
                name: `เพิ่ม Playlist เข้าคิว`,
                iconURL: playlist.user.displayAvatarURL({ dynamic: true }),
                url: playlist.url,
              })
              .setDescription(
                `>>> ** [\`${playlist.name}\`](${playlist.url}) **`
              )
              .addFields([
                {
                  name: `${emoji.song_by} สั่งงานโดย`,
                  value: `>>> ${playlist.user}`,
                  inline: true,
                },
                {
                  name: `${emoji.time} ระยะเวลา`,
                  value: `>>> \`${playlist.formattedDuration}\``,
                  inline: true,
                },
                {
                  name: `${emoji.lyrics} เพลง`,
                  value: `>>> \`${playlist.songs.length} เพลง\``,
                  inline: true,
                },
              ])
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => {});
          }, 5000);
        })
        .catch((e) => {});
    });
    // disconnect
    player.on("disconnect", async (queue) => {
      if (!queue) return;
      client.updatemusic(queue.textChannel.guild);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      let ID = client.temp2.get(queue.textChannel.guild.id);
      let playembed = await queue.textChannel.messages.fetch(ID, {
        cache: true,
        force: true,
      });
      if (playembed) {
        playembed.edit({ components: [client.buttons2] }).catch((e) => {});
      }
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `_ ${emoji.ERROR} โดนใครสักคนเตะออกจากห้อง_`
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    });
    // finish song
    player.on("finishSong", async (queue, song) => {
      if (!queue) return;
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      let ID = client.temp2.get(queue.textChannel.guild.id);
      let playembed = await queue.textChannel.messages.fetch(ID, {
        cache: true,
        force: true,
      });
      if (playembed) {
        playembed.edit({ components: [client.buttons2] }).catch((e) => {});
      }
      queue.textChannel
        .send({
          embeds: [
            new MessageEmbed()
              .setColor(ee.color)
              .setDescription(`_ [\`${song.name}\`](${song.url}) จบแล้ว  _`)
              .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
          ],
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete().catch((e) => {});
          }, 10000);
        })
        .catch((e) => {});
    });
    // error
    player.on("error", async (channel, error) => {
      let channel1 = client.music.get(channel.guild.id, "channel");
      if (channel.id === channel1) return;
      let ID = client.temp2.get(channel.guild.id);
      let playembed = await channel.messages
        .fetch(ID, {
          cache: true,
          force: true,
        })
        .catch((e) => {});
      if (playembed) {
        playembed.edit({ components: [client.buttons2] }).catch((e) => {});
      }
      channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`Found a Error...`)
            .setDescription(String(error).substring(0, 3000))
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    });
    // no related
    player.on("noRelated", async (queue) => {
      if (!queue) return;
      client.updatemusic(queue.textChannel.guild);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setTitle(`ไม่พบเพลงที่เกี่ยวข้องสำหรับ \`${queue.songs[0].name}\``)
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    });
    // finish queue
    player.on("finish", async (queue) => {
      if (!queue) return;
      client.updatemusic(queue.textChannel.guild);
      let data = await client.music.get(queue.textChannel.guild.id);
      if (queue.textChannel.id === data.channel) return;
      let ID = client.temp2.get(queue.textChannel.guild.id);
      let playembed = await queue.textChannel.messages.fetch(ID, {
        cache: true,
        force: true,
      });
      if (playembed) {
        playembed.edit({ components: [client.buttons2] }).catch((e) => {});
      }
      queue.textChannel.send({
        embeds: [
          new MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              ` การเล่นจบแล้ว \n ถ้าชอบระบบการเล่นเข้าไปให้คะแนนได้ที่ [Top.gg](https://top.gg/bot/915021697688666123)`
            )
            .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
        ],
      });
    });
    // init queue
    player.on("initQueue", async (queue) => {
      (queue.volume = 90), (queue.autoplay = false);
    });
  } catch (e) {
    console.log(e);
  }

  // interaction handling
  try {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.guild || interaction.user.bot) return;
      if (interaction.isButton()) {
        await interaction.deferUpdate().catch((e) => {});
        const { customId, member, guild } = interaction;
        let voiceMember = interaction.guild.members.cache.get(member.id);
        let channel = voiceMember.voice.channel;
        let queue = await player.getQueue(interaction.guild.id);
        switch (customId) {
          case "playp":
            {
              if (!channel) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน**`
                );
              } else if (
                interaction.guild.me.voice.channel &&
                !interaction.guild.me.voice.channel.equals(channel)
              ) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงที่มี DAL Music **`
                );
              } else if (!queue || !queue.previousSongs.length) {
                send(
                  interaction,
                  `** ${emoji.ERROR} ไม่พบเพลงก่อนหน้า **`
                );
              } else {
                await queue.previous().catch((e) => {});
                send(
                  interaction,
                  `** ${emoji.previous_track} เล่นเพลงก่อนหน้า**.`
                );
              }
            }
            break;
          case "skip":
            {
              if (!channel) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน**`
                );
              } else if (
                interaction.guild.me.voice.channel &&
                !interaction.guild.me.voice.channel.equals(channel)
              ) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงที่มี DAL Music **`
                );
              } else if (!queue) {
                send(interaction, `** 🎧 ไม่มีการเล่น **`);
              } else if (queue.songs.length === 1) {
                queue.stop().catch((e) => {});
                send(interaction, `** ${emoji.skip_track} ข้ามเพลง !!**.`);
              } else {
                await queue.skip().catch((e) => {});
                send(interaction, `** ${emoji.skip_track} ข้ามเพลง !!**.`);
              }
            }
            break;
          case "stop":
            {
              if (!channel) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน**`
                );
              } else if (
                interaction.guild.me.voice.channel &&
                !interaction.guild.me.voice.channel.equals(channel)
              ) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงที่มี DAL Music **`
                );
              } else if (!queue) {
                send(interaction, `** 🎧 ไม่มีการเล่น **`);
              } else {
                await queue.stop().catch((e) => {});
                send(interaction, `** ${emoji.stop} การเล่นหยุดลง !!**.`);
              }
            }
            break;
          case "pause":
            {
              if (!channel) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน**`
                );
              } else if (
                interaction.guild.me.voice.channel &&
                !interaction.guild.me.voice.channel.equals(channel)
              ) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงที่มี DAL Music **`
                );
              } else if (!queue) {
                send(interaction, `** 🎧 ไม่มีการเล่น **`);
              } else if (queue.paused) {
                await queue.resume();
                client.buttons.components[1] = new MessageButton()
                  .setCustomId("pause")
                  .setStyle("SECONDARY")
                  .setLabel("หยุดชั่วคราว")
                  .setEmoji(emoji.pause);
                let ID =
                  client.temp.get(queue.textChannel.guild.id) ||
                  client.temp2.get(queue.textChannel.guild.id);
                let playembed = await queue.textChannel.messages
                  .fetch(ID, {
                    cache: true,
                    force: true,
                  })
                  .catch((e) => {});

                playembed
                  .edit({ components: [client.buttons] })
                  .catch((e) => {});

                send(interaction, `** ${emoji.resume} เริ่มการเล่นต่อ !! **`);
              } else if (!queue.paused) {
                await queue.pause();
                client.buttons.components[1] = new MessageButton()
                  .setCustomId("pause")
                  .setStyle("SECONDARY")
                  .setLabel("เล่นต่อ")
                  .setEmoji(emoji.resume);
                let ID =
                  client.temp.get(queue.textChannel.guild.id) ||
                  client.temp2.get(queue.textChannel.guild.id);
                let playembed = await queue.textChannel.messages
                  .fetch(ID, {
                    cache: true,
                    force: true,
                  })
                  .catch((e) => {});
                if (playembed) {
                  playembed
                    .edit({ components: [client.buttons] })
                    .catch((e) => {});
                }
                send(interaction, `** ${emoji.pause} หยุดชั่วคราว !! **`);
              }
            }
            break;
          case "loop":
            {
              if (!channel) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงก่อน**`
                );
              } else if (
                interaction.guild.me.voice.channel &&
                !interaction.guild.me.voice.channel.equals(channel)
              ) {
                send(
                  interaction,
                  `** ${emoji.ERROR} คุณต้องเข้าห้องเสียงที่มี DAL Music **`
                );
              } else if (!queue) {
                send(interaction, `** 🎧 ไม่มีการเล่น **`);
              } else if (queue.repeatMode === 0) {
                await queue.setRepeatMode(1);
                client.buttons.components[3] = new MessageButton()
                  .setStyle("SECONDARY")
                  .setCustomId("loop")
                  .setLabel("Queue")
                  .setEmoji("🔁");
                  let ID =
                  client.temp.get(queue.textChannel.guild.id) ||
                  client.temp2.get(queue.textChannel.guild.id);
                let playembed = await queue.textChannel.messages
                  .fetch(ID, {
                    cache: true,
                    force: true,
                  })
                  .catch((e) => {});
                if (playembed) {
                  playembed
                    .edit({ components: [client.buttons] })
                    .catch((e) => {});
                }
                send(interaction, `** ${emoji.SUCCESS} Song Loop เปิด !! **`);
              } else if (queue.repeatMode === 1) {
                await queue.setRepeatMode(2);
                client.buttons.components[3] = new MessageButton()
                  .setStyle("SECONDARY")
                  .setCustomId("loop")
                  .setLabel("ปิด")
                  .setEmoji(emoji.repeat_mode);
                  let ID =
                  client.temp.get(queue.textChannel.guild.id) ||
                  client.temp2.get(queue.textChannel.guild.id);
                let playembed = await queue.textChannel.messages
                  .fetch(ID, {
                    cache: true,
                    force: true,
                  })
                  .catch((e) => {});
                if (playembed) {
                  playembed
                    .edit({ components: [client.buttons] })
                    .catch((e) => {});
                }
                send(interaction, `** ${emoji.SUCCESS} Queue Loop เปิด !! **`);
              } else if (queue.repeatMode === 2) {
                await queue.setRepeatMode(0);
                client.buttons.components[3] = new MessageButton()
                  .setStyle("SECONDARY")
                  .setCustomId("loop")
                  .setLabel("Song")
                  .setEmoji("🔂");
                  let ID =
                  client.temp.get(queue.textChannel.guild.id) ||
                  client.temp2.get(queue.textChannel.guild.id);
                let playembed = await queue.textChannel.messages
                  .fetch(ID, {
                    cache: true,
                    force: true,
                  })
                  .catch((e) => {});
                if (playembed) {
                  playembed
                    .edit({ components: [client.buttons] })
                    .catch((e) => {});
                }
                send(interaction, `** ${emoji.SUCCESS} Loop ปิด !! **`);
              }
            }
            break;
          default:
            break;
        }
      }
    });
  } catch (e) {
    console.log(e);
  }

  client.on("messageCreate", async (message) => {
    if (!message.guild || !message.guild.available) return;
    let data = await client.music.get(message.guildId);
    if (data.enable === false) return;
    let channel = await message.guild.channels.cache.get(data.channel);
    if (!channel) return;
    if (message.channel.id === channel.id) {
      if (message.author.bot) {
        setTimeout(() => {
          message.delete().catch((e) => {});
        }, 3000);
      } else {
        let voiceChannel = await message.member.voice.channel;
        if (!voiceChannel) {
          return send(message, `คุณต้องเข้าห้องเสียงก่อน`);
        } else if (
          message.guild.me.voice.channel &&
          !message.guild.me.voice.channel.equals(voiceChannel)
        ) {
          return send(message, `คุณต้องเข้าห้องเสียงที่มี DAL Music`);
        } else {
          let song = message.cleanContent;
          await message.delete().catch((e) => {});
          player
            .play(voiceChannel, song, {
              member: message.member,
              message: message,
              textChannel: message.channel,
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
  });
};

/**
 *
 * @param {ButtonInteraction} interaction
 * @param {String} string
 */
async function send(interaction, string) {
  interaction
    .followUp({
      embeds: [
        new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`>>> ${string.substring(0,3000)}`)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon }),
      ],
    })
    .then((m) => {
      setTimeout(() => {
        m.delete().catch((e) => {});
      }, 4000);
    });
}
