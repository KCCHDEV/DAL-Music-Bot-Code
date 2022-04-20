var colors = require('colors');
const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    // Intents.FLAGS.GUILD_BANS,
    // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    // Intents.FLAGS.GUILD_INTEGRATIONS,
    // Intents.FLAGS.GUILD_WEBHOOKS,
    // Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    // Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    // Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    // Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});
module.exports = client;

const config = require("./settings/config.json");

// // for replit
 const express = require("express");
 const app = express();
 const port = 3000;

 app.get("/", (req, res) => {
   res.send("เอาลิ้งค์เว็บไปใส่ใน https://uptimerobot.com/ ด้วย!");
 });

 app.listen(port, () => {
   console.log(` app listening on port ${port}`.brightGreen);
 });

// Global Variables
client.events = new Collection();
client.cooldowns = new Collection();
client.subcmd = new Collection();
client.commands = new Collection();
client.mcommands = new Collection();
client.aliases = new Collection();
client.temp = new Map();
client.temp2 = new Map();
client.categories = fs.readdirSync("./commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["event_handler", "slash_handler", "Player_Handler", "command_handler",]
  .forEach((handler) => {
  require(`./handlers/${handler}`)
    (client)
    ;
});

// // database connection
const Enmap = require("enmap");
client.settings = new Enmap({
  name: "settings",
  dataDir: "./Database/Settings",
});
client.music = new Enmap({
  name: "music",
  dataDir: "./Database/Music",
});

client.login(process.env.TOKEN || config.token);

//------------- AntiCrash -------------

process.on("unhandledRejection", (reason, p) => {
  console.log(" [AntiCrash] :: Unhandled Rejection/Catch".bgYellow);
  //console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch".bgYellow);
  //console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [AntiCrash] :: Uncaught Exception/Catch (MONITOR)".bgYellow);
  //console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
   console.log(" [AntiCrash] :: Multiple Resolves".bgGreen);
   //console.log(type, promise, reason);
});

console.log(`AntiCrash Run in background console msg off`.bgBlue);
//---------------------- CR -----------------------------
console.log(`------- CR -------`.rainbow);
console.log(`1 - Code By Kabir Singh `);
console.log(`2 - Tech Boy Development (Edit 1)`);
console.log(`3 - KCCH Dev (Edit 2)`);
console.log(`4 -`);
console.log(`5 -`);
console.log(`6 -`);
console.log(`7 -`);
console.log(`8 -`);
console.log(`------------------`.rainbow);


