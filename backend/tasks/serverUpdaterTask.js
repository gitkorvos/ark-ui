const axios = require('axios');


// Models
const Server = require('../models/Server'); 
const ServerPlayerHistory = require('../models/ServerPlayerHistory');


const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// Function to update the server model with the retrieved data
async function updateServerModel(serverData) {
  try {

    const server = await Server.findOne({ where: { name: serverData.Name } });

    if (server) {

      server.name = serverData.Name;
      server.player_count = serverData.NumPlayers;
      server.map = serverData.MapName;
      server.timestamp = new Date(),
      await server.save();

      await ServerPlayerHistory.create({
        serverId: server.id,
        player_count: serverData.NumPlayers,
        timestamp: new Date(),
      });

    } else {

      await Server.create({
        id: uuidv4(),
        name: serverData.Name,
        player_count: serverData.NumPlayers,
        map: serverData.MapName,
        timestamp: new Date(),
      });
    }

  } catch (error) {
    console.error('Error updating server model:', error);
  }
}

// Fetch data from the URL and update the server model
async function fetchDataAndUpdateServerModel() {
  try {
    const response = await axios.get('http://arkdedicated.com/xbox/cache/officialserverlist.json');
    const serverData = response.data;

    // Update the server model for each server in the retrieved data
    for (const server of serverData) {
      await updateServerModel(server);
    }

    console.log('Server model update complete.');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

module.exports = fetchDataAndUpdateServerModel;
