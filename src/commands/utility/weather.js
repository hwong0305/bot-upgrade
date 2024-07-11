const { SlashCommandBuilder } = require('discord.js');
const { findUser } = require('../../common/user');
const logger = require('../../common/logger');
const { fetchWeather } = require('../../common/weather');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Replies with weather')
    .addStringOption(option =>
      option.setName('location').setDescription('location of the weather report')
    )
    .addBooleanOption(option =>
      option.setName('update').setDescription('update saved location for user')
    ),
  execute: async interaction => {
    const initialLocation = interaction.options.getString('location');
    const updateUser = interaction.options.getBoolean('update');

    let location;
    if (!initialLocation) {
      const response = await findUser(interaction.user.id).catch(async err => {
        logger.error(err);
        await interaction.reply(
          'https://tenor.com/view/winter-aespa-winter-sleeping-winter-aespa-meme-winter-meme-aespa-meme-gif-26168429'
        );
        return { success: false, user: null };
      });

      if (!response || !response.success || !response.user) {
        return interaction.reply(
          'You have not set your location yet. Set your location with `/weather {location} {true}`'
        );
      }
      location = response.user.location;
    } else {
      location = initialLocation;
    }

    console.log(await fetchWeather(location));

    return interaction.reply('https://i.mydramalist.com/qYw8OD_5c.jpg');
  },
};
