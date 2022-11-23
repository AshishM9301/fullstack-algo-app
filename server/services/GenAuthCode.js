const fyers = require("fyers-api-v2");
const Cred = require("../config/keys").flyers;

const getAuthCode = () => {
  fyers.setAppId(Cred.appId);
  fyers.setRedirectUrl("http://127.0.0.1");
  fyers.generateAuthCode();

  return `https://api.fyers.in/api/v2/generate-authcode?client_id=${Cred.appId}&redirect_uri=http://127.0.0.1:3000/redirect&response_type=code&state=sample_state`;
};

module.exports = getAuthCode;
