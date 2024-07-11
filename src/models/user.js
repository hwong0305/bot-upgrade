const { DataTypes } = require('sequelize');
const sequelize = require('./');

const User = sequelize.define('User', {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discordId: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
