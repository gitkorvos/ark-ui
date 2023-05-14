const Server = require("../models/Server");

exports.get_server_list = async (req, res) => {
  try {
    const servers = await Server.findAll();
    res.status(200).json(servers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching servers' });
  }
};
