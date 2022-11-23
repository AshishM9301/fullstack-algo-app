const fyers = require("fyers-api-v2");

const Cred = require("../../config/keys").flyers;

const getMarketData = async (token, socket) => {
  try {
    const body = {
      symbol: ["NSE:USDINR22DECFUT"],

      dataType: "symbolUpdate",
    };

    console.log("token", token);

    fyers.setAppId(Cred.appId);

    fyers.setAccessToken(token);

    // let quotes = new fyers.quotes();
    // let result = await quotes.setSymbol("NSE:USDINR22DECFUT").getQuotes();
    // console.log(result);

    // return result;

    // res.status(200).json(result);

    fyers.fyers_connect(body, function (data) {
      socket.emit("data-from-server", data);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = getMarketData;
