const fyers = require("fyers-api-v2");
const { checkPEData } = require("../../middleware/checkCEData/checkCEData");

const Cred = require("../../config/keys").flyers;

const PEmarketData = async (data, socket) => {
  try {
    let PEsymbol = data.PEsymbol;

    const body = {
      symbol: [`NSE:${PEsymbol}`],

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

    fyers.fyers_connect(body, function (d) {
      checkPEData(d);
      socket.emit("PE-data-from-server", d);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = PEmarketData;
