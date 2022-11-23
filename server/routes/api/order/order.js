const { placeOrder } = require("../../../controllers");

const router = require("express").Router();

router.post("/", placeOrder);

module.exports = router;
