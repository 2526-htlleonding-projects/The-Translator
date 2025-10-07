import {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    MessageContextMenuCommandInteraction, CommandInteraction,
} from 'discord.js';
import {Translator} from "deepl-node";

const translator = new Translator(process.env.DEEPL_KEY!);

export const data = new ContextMenuCommandBuilder()
    .setName('Translate message')
    .setType(ApplicationCommandType.Message);

export async function execute(interaction: MessageContextMenuCommandInteraction) {
    const targetLang = "en-US";
    const message = interaction.targetMessage;

    //return message is empty
    if (!message.content)
        return interaction.reply({content: 'Message has no text.', ephemeral: true});

    try {
        const result = await translator.translateText(message.content, null, targetLang);
        await interaction.reply({content: result.text, ephemeral: true});
    } catch (error) {
        console.error(error);
        await interaction.reply({content: "Translation failed.", ephemeral: true});
    }
}