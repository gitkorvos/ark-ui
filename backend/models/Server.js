const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Server = sequelize.define('server', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  map: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {
    tableName: 'servers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Server;
