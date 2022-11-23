const { getAccessToken } = require("../../../controllers");

const router = require("express").Router();

router.get("/", getAccessToken);

module.exports = router;
