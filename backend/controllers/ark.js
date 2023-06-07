const Server = require("../models/Server");
const ServerHistory = require("../models/ServerPlayerHistory");

exports.get_server_by_uuid = async (req, res) => {
    const id = req.params.uuid;
    try {
        const server = await Server.findOne({ where: { id } });
        if (!server) {
            return res.status(404).send('Server not found');
        }

        // Locate Server By UUID Success
        res.json(server);
        console.log(server);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error', error);
    }
};

exports.get_server_histories_by_uuid = async (req, res) => {
    const id = req.params.uuid;
    try {
        const server = await ServerHistory.findAll({ where: { serverId: id } });
        if (!server) {
            return res.status(404).send('Server not found');
        }

        // Locate Server By UUID Success
        res.json(server);
        console.log(server);

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error', error);
    }
};

exports.get_server_list = async (req, res) => {
    try {
        const servers = await Server.findAll();
        res.status(200).json(servers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching servers' });
    }
};
