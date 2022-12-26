import dayjs from "dayjs";
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
} from "../_actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isLoading: false,
  FUT_MarketData: 0,
  LTP: 0,
  CE: 0,
  PE: 0,
  date: dayjs(Date.now()).format("YY-MMM-DD"),
  CE_Symbol: "USDINRCE",
  PE_Symbol: "USDINRPE",
  CE_MarketData: 0,
  PE_MarketData: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FUT_MARKET_DATA:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        FUT_MarketData: action.payload,
      };

    case GET_CE_MARKET_DATA:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        CE_MarketData: action.payload,
      };
    case GET_PE_MARKET_DATA:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        PE_MarketData: action.payload,
      };

    case GET_FUT_MARKET_DATA_FAIL:
    case GET_CE_MARKET_DATA_FAIL:
    case GET_PE_MARKET_DATA_FAIL:
      return {
        ...state,
        FUT_MarketData: 0,
        PE_MarketData: 0,
        CE_MarketData: 0,
      };

    case DATE:
      return {
        ...state,
        date: action.payload,
      };
    case LTP_VALUE:
      return {
        ...state,
        LTP: action.payload,
      };

    case CE_VALUE:
      return {
        ...state,
        CE: action.payload,
      };
    case CE_SYMBOL:
      return {
        ...state,
        CE_Symbol: action.payload,
      };
    case PE_VALUE:
      return {
        ...state,
        PE: action.payload,
      };
    case PE_SYMBOL:
      return {
        ...state,
        PE_Symbol: action.payload,
      };
    default:
      return state;
  }
}
