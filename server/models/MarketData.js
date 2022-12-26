const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  CESymbol: {
    type: String,
  },
  PESymbol: {
    type: String,
  },
  CEValue: {
    type: Number,
  },
  PEValue: {
    type: Number,
  },
  CEPESUM: {
    type: Number,
  },
  trigger: {
    type: Number,
  },
  token: {
    type: String,
  },
  Qty: {
    type: Number,
  },
  orderPlaced: {
    type: Boolean,
    default: false,
  },
  errorWhilePlacingOrder: {
    type: String,
  },
});

const Market = mongoose.model("MarketData", marketSchema);

module.exports = Market;
