import { TUser } from "../../utils/types";
import {
  AUTH_CHECKED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  USER_LOGOUT,
  TUserActions,
} from "../actions/user";

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  registerUserError: unknown;
  registerUserRequest: boolean;
  loginUserError: unknown;
  loginUserRequest: boolean;
  updateUserError: unknown;
  updateUserRequest: boolean;
  getUserError: unknown;
  getUserRequest: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  registerUserError: null,
  registerUserRequest: false,
  loginUserError: null,
  loginUserRequest: false,
  updateUserError: null,
  updateUserRequest: false,
  getUserError: null,
  getUserRequest: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TUserState => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        data: null,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerUserRequest: true,
        registerUserError: null,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerUserRequest: false,
        data: action.payload,
        isAuthChecked: true,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerUserRequest: false,
        registerUserError: action.payload,
      };
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
        loginUserError: null,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginUserRequest: false,
        data: action.payload,
        isAuthChecked: true,
      };
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: action.payload,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        data: action.payload,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: action.payload,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserError: null,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserError: null,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        data: action.payload,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
