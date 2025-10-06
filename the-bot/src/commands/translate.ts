import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { Translator } from "deepl-node";
import dotenv from "dotenv";
dotenv.config();

const translator = new Translator(process.env.DEEPL_KEY!);

export const data = new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate a message to English")
    .addStringOption(option =>
        option.setName("text")
            .setDescription("Text to translate")
            .setRequired(true)
    );

export async function execute(interaction: ChatInputCommandInteraction) {
    const text = interaction.options.getString("text", true);

    try {
        const result = await translator.translateText(text, null, "en-US");
        await interaction.reply({ content: result.text, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Translation failed.", ephemeral: true });
    }
}