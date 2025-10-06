// src/index.ts
import { Client, Collection, GatewayIntentBits, REST, Routes, Events } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = "1424650295601795123"; // replace with your bot's client ID
const GUILD_ID = "1411698864783888618";  // replace with your server ID

// Extend Client type to store commands
declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>;
    }
}

const client: Client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // privileged, enable in dev portal
    ]
});

client.commands = new Collection();

async function main() {
    // -------- Load Commands --------
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts"));

    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        client.commands.set(command.data.name, command);
    }

    // -------- Register Commands to Guild --------
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
    const commandData = client.commands.map(cmd => cmd.data.toJSON());

    await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commandData }
    );

    console.log("Slash commands registered.");

    // -------- Load Events --------
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".ts"));

    for (const file of eventFiles) {
        const event = await import(`./events/${file}`);
        if (event.once) client.once(event.name, (...args) => event.execute(...args));
        else client.on(event.name, (...args) => event.execute(...args));
    }

    // -------- Login --------
    client.login(process.env.TOKEN);
}

// Run the bot
main().catch(err => console.error(err));
