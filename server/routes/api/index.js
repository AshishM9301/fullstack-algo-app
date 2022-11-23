const router = require("express").Router();
const auth = require("./auth/auth");
const redirect = require("./redirect/redirect");
const order = require("./order/order");

router.use("/auth", auth);
router.use("/redirect", redirect);
router.use("/order", order);

module.exports = router;
