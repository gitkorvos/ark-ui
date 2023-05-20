const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Server = require('../models/Server'); 

const ServerPlayerHistory = sequelize.define('server_player_history', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  player_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

ServerPlayerHistory.belongsTo(Server, { foreignKey: 'serverId' });

module.exports = ServerPlayerHistory;
