const genAuthCode = require("./auth/genAuthCode");
const placeOrder = require("./order/placeOrder");
const getAccessToken = require("./redirect/getAccessToken");
const BaseController = require("./socket");
const getMarketData = require("./market/market");
const CEmarketData = require("./market/CEmarketData");
const PEmarketData = require("./market/PEmarketData");

module.exports = {
  genAuthCode,
  getAccessToken,

  placeOrder,

  BaseController,
  getMarketData,
  PEmarketData,
  CEmarketData,
};
