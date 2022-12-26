import { socket } from "../services/connector";
import {
  CE_SYMBOL,
  CE_VALUE,
  DATE,
  GET_CE_MARKET_DATA,
  GET_CE_MARKET_DATA_FAIL,
  GET_FUT_MARKET_DATA,
  GET_FUT_MARKET_DATA_FAIL,
  GET_PE_MARKET_DATA,
  GET_PE_MARKET_DATA_FAIL,
  LTP_VALUE,
  PE_SYMBOL,
  PE_VALUE,
} from "./types";

export const getFutMarketData = () => (dispatch, getState) => {
  socket.emit("token", getState().auth.token);
};

export const loadInitialDataSocket = (socket) => {
  return (dispatch) => {
    // dispatch(clearAllItems())
    socket.on("data-from-server", (data) => {
      let res = JSON.parse(data);

      if (res.d["7208"].length > 0)
        dispatch({
          type: GET_FUT_MARKET_DATA,
          payload: res?.d["7208"][0]?.v?.low_price,
        });
      else dispatch({ type: GET_FUT_MARKET_DATA_FAIL });
    });

    socket.on("CE-data-from-server", (data) => {
      let res = JSON.parse(data);

      if (res.d["7208"].length > 0)
        dispatch({
          type: GET_CE_MARKET_DATA,
          payload: res?.d["7208"][0]?.v?.lp,
        });
      else dispatch({ type: GET_CE_MARKET_DATA_FAIL });
    });

    socket.on("PE-data-from-server", (data) => {
      let res = JSON.parse(data);

      if (res.d["7208"].length > 0)
        dispatch({
          type: GET_PE_MARKET_DATA,
          payload: res?.d["7208"][0]?.v?.lp,
        });
      else dispatch({ type: GET_PE_MARKET_DATA_FAIL });
    });
  };
};

export const changeLTPValue = (ltpValue) => (dispatch) => {
  dispatch({ type: LTP_VALUE, payload: ltpValue });
  dispatch(changeCEValue());
  dispatch(changePEValue());
};

export const changeCEValue = (ce) => (dispatch, getState) => {
  function closest(arr, val) {
    return Math.max.apply(
      null,
      arr.filter(function (v) {
        return v <= val;
      })
    );
  }

  let newValueArr = getState()?.order?.LTP.split(".");

  let d = getState()?.order.date.split("-");

  let newValue = parseInt(newValueArr[1]);

  let x = 0,
    y = 0,
    p = "",
    initialCE = "USDINR";

  if (newValueArr[1] < 10) {
    newValue = newValueArr[1] * 10;
  }

  let arrRange = [0, 25, 50, 75, 100];

  let no = closest(arrRange, newValue);

  if (no < newValue) {
    x = no / 100 + 0.25;
    //  y = no / 100;
    y = x + parseInt(newValueArr[0]);
    //  q = y + parseInt(newValueArr[0]);

    let d_te = `${d[0] + d[1].split("")[0] + d[2]}`;

    p = initialCE + d_te + y + "CE";

    dispatch({ type: CE_VALUE, payload: y });
    dispatch({ type: CE_SYMBOL, payload: p });
  }
};

export const changePEValue = (pe) => (dispatch, getState) => {
  function closest(arr, val) {
    return Math.max.apply(
      null,
      arr.filter(function (v) {
        return v <= val;
      })
    );
  }

  let newValueArr = getState()?.order?.LTP.split(".");
  let d = getState()?.order.date.split("-");

  let newValue = parseInt(newValueArr[1]);

  let x = 0,
    y = 0,
    p = "",
    initialPE = "USDINR";

  if (newValueArr[1] < 10) {
    newValue = newValueArr[1] * 10;
  }

  let arrRange = [0, 25, 50, 75, 100];

  let no = closest(arrRange, newValue);

  if (no < newValue) {
    // x = no / 100 + 0.25;
    y = no / 100;
    // y = y + parseInt(newValueArr[0]);
    x = y + parseInt(newValueArr[0]);

    let d_te = d[0] + d[1].split("")[0] + d[2];

    console.log(d);

    p = initialPE + d_te + x + "PE";

    dispatch({ type: PE_VALUE, payload: x });
    dispatch({ type: PE_SYMBOL, payload: p });
  }
};

export const changeDate = (date) => (dispatch) => {
  dispatch({ type: DATE, payload: date });
  dispatch(changeCEValue());
  dispatch(changePEValue());
};

export const getCE_PE_Data = () => (dispatch, getState) => {
  let CE_data = {
    token: getState().auth.token,
    CEsymbol: getState()?.order?.CE_Symbol,
  };

  let PE_data = {
    token: getState().auth.token,
    PEsymbol: getState()?.order?.PE_Symbol,
  };

  socket.emit("ce-symbol", CE_data);
  socket.emit("pe-symbol", PE_data);
};
