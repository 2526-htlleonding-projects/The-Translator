// src/commands/ping.ts
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!");

export async function execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "Pong!", ephemeral: true });
}
