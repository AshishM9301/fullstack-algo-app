const fyers = require("fyers-api-v2");

const Cred = require("../../config/keys").flyers;

const PEmarketData = async (token, socket) => {
  try {
    let PEsymbol = "";

    socket.on("pe-symbol", (data) => {
      PEsymbol = data;
    });

    const body = {
      symbol: [PEsymbol],

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
      socket.emit("CE-data-from-server", data);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = PEmarketData;
