import { Client, GatewayIntentBits, Interaction, Message } from "discord.js";
import dotenv from "dotenv";
import { getClassInfo, getScheduleDay } from "./readClassRoom";
import { schedule } from "./schedule";

dotenv.config();

const secrete_key = process.env.SECRETE_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message: Message) => {
  console.log(message.content);
  if (message.content.startsWith("test")) {
    message.channel.send("hallo, ka xa Bro 🔥👊!!");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand() && interaction.commandName === "kunho") {
    console.log("kunho command called");
    const result = getClassInfo(schedule);
    interaction.reply({
      content: result,
    });
  }
  if (interaction.isCommand() && interaction.commandName === "sabai") {
    console.log("sabai command called");
    // @ts-ignore
    const day = interaction.options.getString("day");
    const result = getScheduleDay(schedule, day);
    interaction.reply({
      content: result,
    });
  }
});

client.login(secrete_key);
