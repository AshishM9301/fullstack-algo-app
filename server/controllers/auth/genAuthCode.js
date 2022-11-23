const getAuthCode = require("../../services/GenAuthCode");

const genAuthCode = async (req, res, next) => {
  try {
    const code = await getAuthCode();

    res.status(200).json({
      success: true,
      link: code,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = genAuthCode;
