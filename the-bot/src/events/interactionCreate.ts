// src/events/interactionCreate.ts
import { Events, Client, Interaction } from "discord.js";

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: Interaction, client: Client) {

    //handle Chat Input Command
    if (interaction.isChatInputCommand()){
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "There was an error executing this command.", ephemeral: true });
            } else {
                await interaction.reply({ content: "There was an error executing this command.", ephemeral: true });
            }
        }
    }

    //handle Message Context Menu Command
    else if(interaction.isMessageContextMenuCommand()){
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred)
                await interaction.followUp({ content: "Error executing context command.", ephemeral: true });
            else
                await interaction.reply({ content: "Error executing context command.", ephemeral: true });
        }
    }

    //if interaction isn't being handled
    else {
        console.log("Command not handled in interactionCreate");
    }
}
