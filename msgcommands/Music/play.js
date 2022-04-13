const { Message, Client } = require("discord.js");

module.exports = {
  name: "play",
  aliases: ["p", "song"],
  description: `เล่นเพลง`,
  userPermissions: ["CONNECT"],
  botPermissions: ["CONNECT"],
  category: "Music",
  cooldown: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    // code
    message.reply(`working`);
  },
};
