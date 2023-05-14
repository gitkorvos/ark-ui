const express = require("express");
const router = express.Router();

const ArkDataController = require("../controllers/ark.js");
const Server = require("../models/Server");

router.get("/api/your-resource", ArkDataController.get_server_list);

router.get('/server/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
      const server = await Server.findOne({ where: { uuid } });
      if (!server) {
        return res.status(404).send('Server not found');
      }
      
      // Locate Server By UUID Success
      res.json(server);
      console.log(server);
      
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
