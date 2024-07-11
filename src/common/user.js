const User = require('../models/user');
const logger = require('./logger');

const findUser = async discordId => {
  try {
    const user = await User.findOne({
      where: {
        discordId,
      },
    });

    if (user === null) {
      return { success: true, user: null };
    }
  } catch (err) {
    logger.error(err);
    return { success: false, user: null };
  }
};

const updateUser = async userObj => {
  try {
    await User.update(
      {
        location: userObj.location,
      },
      {
        where: {
          discordId: userObj.discordId,
        },
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
