const { genAuthCode } = require("../../../controllers");

const router = require("express").Router();

router.get("/generate/auth", genAuthCode);

module.exports = router;
