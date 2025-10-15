import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { TargetLanguageCode, Translator } from "deepl-node";
import dotenv from "dotenv";
dotenv.config({ path: '/home/arthur/TheTranslator/the-bot/.env' });

const translator = new Translator(process.env.DEEPL_KEY!);

export async function buildCommand() {
    const languages = await translator.getTargetLanguages();
    let choices = languages.map(lang => ({
        name: lang.name,
        value: lang.code,
    }));
    choices = choices.slice(0, 25);

    return new SlashCommandBuilder()
        .setName("translate-from-text")
        .setDescription("Translate a message to a target language")
        .addStringOption(optionText =>
            optionText
                .setName("text")
                .setDescription("Text to translate")
                .setRequired(true)
        )
        .addStringOption(optionTargetLang =>
            optionTargetLang
                .setName("language")
                .setDescription("The target language")
                .setRequired(false)
                .addChoices(...choices)
        );
}

export async function execute(interaction: ChatInputCommandInteraction) {
    const text = interaction.options.getString("text", true);
    const targetLang =
        interaction.options.getString("language", false) ?? "EN-US";

    try {
        const result = await translator.translateText(text, null, targetLang as TargetLanguageCode);
        await interaction.reply({ content: result.text, ephemeral: true });
    } catch (error) {
        console.error(error);
        await interaction.reply({content: "Translation failed.", ephemeral: true,});
    }
}
