const Market = require("../../models/MarketData");
const fyers = require("fyers-api-v2");
const Cred = require("../../config/keys").flyers;

const dayjs = require("dayjs");

let sum = 0,
  ce = 0,
  pe = 0;

const checkCEData = async (data) => {
  let res = JSON.parse(data);
  ce = res?.d["7208"][0]?.v?.lp;
};

const checkPEData = async (data) => {
  let res = JSON.parse(data);
  pe = res?.d["7208"][0]?.v?.lp;

  getSum();
};

const getSum = async () => {
  sum = ce + pe;
  let totalSum = parseFloat(sum);
  console.log("SUm", sum);

  const date = dayjs(Date.now()).format("DD-MMM-YY");

  const getSavedSum = await Market.aggregate([{ $match: { date: date } }]);

  if (getSavedSum.length > 0 && getSavedSum[0].CEPESUM > totalSum) {
    await Market.findOneAndUpdate(
      {
        date,
      },
      {
        date: date,
        CEPESUM: totalSum,
        CEValue: ce,
        PEValue: pe,
      },
      { upsert: true, new: true }
    );
  } else {
    if (totalSum) {
      await Market.findOneAndUpdate(
        {
          date,
        },
        {
          date: date,
          CEPESUM: totalSum,
          CEValue: ce,
          PEValue: pe,
        },
        { upsert: true, new: true }
      );
    }
  }

  console.log(
    getSavedSum[0]?.trigger >= getSavedSum[0].CEPESUM &&
      !getSavedSum[0].orderPlaced
  );

  if (
    getSavedSum[0]?.trigger >= getSavedSum[0].CEPESUM &&
    !getSavedSum[0].orderPlaced
  ) {
    console.log("Placing Order", getSavedSum[0].CESymbol);
    try {
      fyers.setAppId(Cred.appId);

      fyers.setAccessToken(getSavedSum[0]?.token);

      const reqBody = {
        data: [
          {
            symbol: `NSE:${getSavedSum[0].CESymbol}`,
            qty: 1,
            type: 2,
            side: 1,
            productType: "MARGIN",
            limitPrice: 0,
            // getSavedSum[0].CEValue
            stopPrice: 0,
            disclosedQty: 0,
            validity: "DAY",
            offlineOrder: "False",
            stopLoss: 0,
            takeProfit: 0,
          },
          {
            symbol: `NSE:${getSavedSum[0].PESymbol}`,
            qty: 1,
            type: 2,
            side: 1,
            productType: "MARGIN",
            limitPrice: 0,
            // getSavedSum[0].PEValue
            stopPrice: 0,
            disclosedQty: 0,
            validity: "DAY",
            offlineOrder: "False",
            stopLoss: 0,
            takeProfit: 0,
          },
        ],

        app_id: Cred.appId,

        token: getSavedSum[0]?.token,
      };

      await fyers.place_multi_order(reqBody);

      await Market.findOneAndUpdate(
        {
          date,
        },
        {
          orderPlaced: true,
        },
        { upsert: true, new: true }
      );
    } catch (err) {
      console.log(err);
      await Market.findOneAndUpdate(
        {
          date,
        },
        {
          errorWhilePlacingOrder: `${err}`,
        },
        { upsert: true, new: true }
      );
    }
  }
};

module.exports = { checkCEData, checkPEData };
