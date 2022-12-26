const router = require("express").Router();
const auth = require("./auth/auth");
const redirect = require("./redirect/redirect");
const order = require("./order/order");
const market = require("./market/market");

router.use("/auth", auth);
router.use("/redirect", redirect);
router.use("/order", order);
router.use("/market", market);

module.exports = router;
