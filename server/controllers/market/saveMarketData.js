const Market = require("../../models/MarketData");

const dayjs = require("dayjs");

const saveMarketData = async (req, res, next) => {
  try {
    const { trigger, qty, CESymbol, PESymbol } = req.body;

    const date = dayjs(Date.now()).format("DD-MMM-YY");

    const save = await Market.findOneAndUpdate(
      {
        date,
      },
      {
        trigger,
        Qty: qty,
        CESymbol,
        PESymbol,
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: save,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = saveMarketData;
