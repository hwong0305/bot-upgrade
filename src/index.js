const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const logger = require('./common/logger');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.once(Events.ClientReady, readyClient => {
  logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

const foldersPath = path.join(__dirname, 'commands', 'utility');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
