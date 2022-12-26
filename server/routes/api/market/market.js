const saveMarketData = require("../../../controllers/market/saveMarketData");

const router = require("express").Router();

router.post("/", saveMarketData);

module.exports = router;
