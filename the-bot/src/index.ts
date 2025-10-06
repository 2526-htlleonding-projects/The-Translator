import { Client, Collection, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

(client as any).commands = new Collection();

async function load() {
    // Commands
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".ts"));
    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        (client as any).commands.set(command.data.name, command);
    }

    // Events
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith(".ts"));
    for (const file of eventFiles) {
        const event = await import(`./events/${file}`);
        if (event.once) client.once(event.name, (...args) => event.execute(...args));
        else client.on(event.name, (...args) => event.execute(...args));
    }

    client.login(process.env.TOKEN);
}

load();
