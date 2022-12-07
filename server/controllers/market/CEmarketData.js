const fyers = require("fyers-api-v2");

const Cred = require("../../config/keys").flyers;

const CEmarketData = async (data, socket) => {
  try {
    let CEsymbol = data.CEsymbol;

    const body = {
      symbol: [CEsymbol],

      dataType: "symbolUpdate",
    };

    console.log("token", data.token);

    fyers.setAppId(Cred.appId);

    fyers.setAccessToken(data.token);

    // let quotes = new fyers.quotes();
    // let result = await quotes.setSymbol("NSE:USDINR22DECFUT").getQuotes();
    // console.log(result);

    // return result;

    // res.status(200).json(result);

    fyers.fyers_connect(body, function (data) {
      socket.emit("CE-data-from-server", data);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = CEmarketData;
