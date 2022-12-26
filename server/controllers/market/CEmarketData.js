const fyers = require("fyers-api-v2");
const { checkCEData } = require("../../middleware/checkCEData/checkCEData");

const Cred = require("../../config/keys").flyers;

const CEmarketData = async (data, socket) => {
  try {
    let CEsymbol = data.CEsymbol;

    const body = {
      symbol: [`NSE:${CEsymbol}`],

      dataType: "symbolUpdate",
    };

    console.log("token", data.token);

    fyers.setAppId(Cred.appId);

    fyers.setAccessToken(data.token);

    // let quotes = new fyers.quotes();
    // let result = await quotes.setSymbol("NSE:USDINR22D1683.25CE").getQuotes();
    // console.log(result, "ONce called data");

    // return result;

    // res.status(200).json(result);

    fyers.fyers_connect(body, function (d) {
      checkCEData(d);
      socket.emit("CE-data-from-server", d);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = CEmarketData;
