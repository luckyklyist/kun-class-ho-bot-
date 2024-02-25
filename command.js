const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const commands = [
  {
    name: "kunho",
    description: "Replies the current class and starting time",
  },
  {
    name: "sabai",
    description: "Reply with all the classes of the day",
    options: [
      {
        name: "day",
        description: "Select the day",
        type: 3,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(process.env.SECRETE_KEY);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
