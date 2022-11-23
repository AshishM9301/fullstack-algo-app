const fyers = require("fyers-api-v2");
const Cred = require("../config/keys").flyers;
const log = console.log;

const genAccessToken = async (auth_code) => {
  fyers.setAppId(Cred.appId);
  const reqBody = {
    auth_code: auth_code,
    secret_key: Cred.secret,
  };

  const resp = await fyers.generate_access_token(reqBody);

  console.log(resp);

  return resp;
};

module.exports = genAccessToken;
