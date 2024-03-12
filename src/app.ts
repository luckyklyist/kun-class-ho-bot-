import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Interaction,
  Message,
} from "discord.js";
import dotenv from "dotenv";
import { getClassInfo, getScheduleDay } from "./readClassRoom";
import { schedule } from "./schedule";
import fetchWeather from "./weather";
import startServer from "./server";

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
  startServer();
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
    const day = interaction.options.get("day")?.value as string;
    const result = getScheduleDay(schedule, day);
    interaction.reply({
      content: result,
    });
  }
  if (interaction.isCommand() && interaction.commandName === "din") {
    console.log("din command called");
    const infoWeather = await fetchWeather();
    // embed weather info
    const embed = new EmbedBuilder()
      .setTitle("Weather Info")
      .setDescription("Weather information kathamndu Today ⚡️☀️")
      .setColor("#0099ff")
      .addFields(
        {
          name: "Current Temperature 🌡️",
          value: `${infoWeather?.currentTemperature}°C`,
          inline: true,
        },
        {
          name: "Timezone 🕒",
          value: infoWeather?.timezone,
          inline: true,
        },
        {
          name: "Average Temperature 🌍 KTM",
          value: `${infoWeather?.avgTemperature}°C`,
          inline: true,
        }
      );

    interaction.reply({
      embeds: [embed],
    });
  }
});

client.login(secrete_key);
