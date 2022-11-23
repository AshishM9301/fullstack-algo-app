const fyers = require("fyers-api-v2");
const Cred = require("../../config/keys").flyers;
const placeOrder = async (req, res, next) => {
  let token = "";
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
  }

  const { CE, PE, qty } = req.body;

  try {
    fyers.setAppId(Cred.appId);

    fyers.setAccessToken(token);

    const reqBody = {
      data: [
        {
          symbol: CE,
          qty: qty,
          type: 1,
          side: 1,
          productType: "MARGIN",
          limitPrice: limitPrice,
          stopPrice: 0,
          disclosedQty: 0,
          validity: "DAY",
          offlineOrder: "false",
          stopLoss: 0,
          takeProfit: 0,
        },
        {
          symbol: PE,
          qty: qty,
          type: 1,
          side: 1,
          productType: "MARGIN",
          limitPrice: limitPrice,
          stopPrice: 0,
          disclosedQty: 0,
          validity: "DAY",
          offlineOrder: "false",
          stopLoss: 0,
          takeProfit: 0,
        },
      ],

      app_id: Cred.appId,

      token: token,
    };

    const data = await fyers.place_order(reqBody);

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = placeOrder;
