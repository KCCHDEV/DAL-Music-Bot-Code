const { MessageEmbed } = require("discord.js");
const client = require("..");
const { cooldown, databasing } = require("../handlers/functions");
var config = require("../settings/config.json");
var ee = require("../settings/embed.json");

client.on("interactionCreate", async (interaction) => {
  await databasing(interaction.guild.id, interaction.member.id);
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction
      .deferReply({
        ephemeral: false,
      })
      .catch((e) => {});
    let prefix = "/";
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: " มีหนูหลุดเข้าไปใน Server กำลังแก้ไข " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      // checking user perms
      if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
        return client.embed(
          interaction,
          `คุณไม่มี \`${cmd.userPermissions}\` Permission เพื่อใช้ \`${cmd.name}\` `
        );
      } else if (
        !interaction.guild.me.permissions.has(cmd.botPermissions || [])
      ) {
        return client.embed(
          interaction,
          `คุณไม่มี \`${cmd.botPermissions}\` Permission เพื่อใช้ \`${cmd.name}\` `
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` Cooldown , รอ \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Seconds`
        );
      } else {
        cmd.run({ client, interaction, args, prefix });
      }
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});
