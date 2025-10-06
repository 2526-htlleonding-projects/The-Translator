import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once("ready", () => console.log(`Logged in as ${client.user?.tag}`));

client.on("messageCreate", msg => {
    if (msg.content === "!ping") msg.reply("Pong!");
});

client.login(process.env.TOKEN);
