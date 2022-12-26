import { connect, socket } from "../services/connector";
import {
  LINK_LOGIN_FAIL,
  LINK_LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADING,
} from "./types";
import { getFutMarketData } from "./_orderActions";

export const loadUser =
  ({ authCode }) =>
  async (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    await connect(
      `/redirect?s=ok&auth_code=${authCode}`,
      "GET",
      null,
      null
    ).then((data) => {
      if (data.success) {
        console.log(data, "Response");

        dispatch({ type: LOGIN_SUCCESS, payload: data });
        dispatch(getFutMarketData());
      } else {
        dispatch({ type: LOGIN_FAIL });
      }
    });
  };

export const login = () => async (dispatch, getState) => {
  await connect("/auth/generate/auth", "GET", null, null).then((data) => {
    if (data.success) {
      dispatch({ type: LINK_LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({ type: LINK_LOGIN_FAIL });
    }
  });
};
