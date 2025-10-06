import { Collection } from "discord.js";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>; // replace 'any' with your command type if you define one
    }
}
