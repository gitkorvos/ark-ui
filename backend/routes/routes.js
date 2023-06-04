const express = require("express");
const router = express.Router();

const ArkDataController = require("../controllers/ark.js");

router.get("/api/server-list", ArkDataController.get_server_list);
router.get('/api/server/:uuid', ArkDataController.get_server_by_uuid);

module.exports = router;
