const client = require("../index");
const { MessageEmbed } = require("discord.js");

client.on("guildCreate", async (guild) => {
  if (!guild) return;
  let channel = guild.channels.cache.find(
    (ch) =>
      ch.type === "GUILD_TEXT" &&
      ch.permissionsFor(guild.me).has("SEND_MESSAGES")
  );

  if (guild.me.permissions.has("USE_APPLICATION_COMMANDS")) {
    try {
      let commands = await client.commands.map((cmd) => cmd);
      await guild.commands.set(commands).catch((e) => {
        console.log(e);
      });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    await channel.send(
      `ไม่สามารถสร้าง \`USE_APPLICATION_COMMANDS\` โปรดลอง reinvite`
    );
    setTimeout(() => {
      guild.leave().catch((e) => {});
    }, 5000);
  }
});
