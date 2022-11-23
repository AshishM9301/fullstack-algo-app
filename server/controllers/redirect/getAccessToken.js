const genAccessToken = require("../../services/GenAccessToken");

const getAccessToken = async (req, res, next) => {
  try {
    const { s, auth_code } = req.query;

    let token,
      refreshToken,
      msg = "";

    if (s === "ok") {
      const { access_token, refresh_token, message } = await genAccessToken(
        auth_code
      );
      token = access_token;
      refreshToken = refresh_token;
      msg = message;
    }

    if (!token) {
      return res.status(400).json({
        success: false,
        message: msg,
      });
    }

    res.status(200).json({
      success: true,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = getAccessToken;
