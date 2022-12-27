// import { socket } from "../services/connector";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LINK_LOGIN_SUCCESS,
  LINK_LOGIN_FAIL,
} from "../_actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  link: "",
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };

    case LINK_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        link: action.payload.link,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      //socket.emit("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LINK_LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
