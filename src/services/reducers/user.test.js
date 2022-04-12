import { userReducer, initialState } from "./user";

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
} from "../actions/user";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle USER_LOGOUT action", () => {
    expect(
      userReducer({
        ...initialState, 
        data: { email: "test@mail.com", name: "TestUser"
      }}, {
        type: USER_LOGOUT,
      }) 
    ).toEqual({ ...initialState, data: null });
  });

  it("should handle AUTH_CHECKED action", () => {
    expect(
      userReducer(initialState, {
        type: AUTH_CHECKED,
      })
    ).toEqual({ ...initialState, isAuthChecked: true });
  });

  it("should handle REGISTER_USER_REQUEST action", () => {
    expect(
      userReducer(initialState, {
        type: REGISTER_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      registerUserRequest: true,
      registerUserError: null,
    });
  });

  it("should handle REGISTER_USER_SUCCESS action", () => {
    expect(
      userReducer(initialState, {
        type: REGISTER_USER_SUCCESS,
        payload: { email: "test@mail.com", name: "TestUser" },
      })
    ).toEqual({
      ...initialState,
      data: { email: "test@mail.com", name: "TestUser" },
      registerUserRequest: false,
      isAuthChecked: true,
    });
  });

  it("should handle REGISTER_USER_FAILED action", () => {
    const error = new Error("error");

    expect(
      userReducer(initialState, {
        type: REGISTER_USER_FAILED,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      registerUserRequest: false,
      registerUserError: error,
    });
  });

  it("should handle LOGIN_USER_REQUEST action", () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      loginUserRequest: true,
      loginUserError: null,
    });
  });

  it("should handle LOGIN_USER_SUCCESS action", () => {
    expect(
      userReducer(initialState, {
        type: LOGIN_USER_SUCCESS,
        payload: { email: "test@mail.com", name: "TestUser" },
      })
    ).toEqual({
      ...initialState,
      data: { email: "test@mail.com", name: "TestUser" },
      loginUserRequest: false,
      isAuthChecked: true,
    });
  });

  it("should handle LOGIN_USER_FAILED action", () => {
    const error = new Error("error");

    expect(
      userReducer(initialState, {
        type: LOGIN_USER_FAILED,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      loginUserRequest: false,
      loginUserError: error,
    });
  });

  it("should handle GET_USER_REQUEST action", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual({ ...initialState, getUserRequest: true });
  });

  it("should handle GET_USER_SUCCESS action", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: { email: "test@mail.com", name: "TestUser" },
      })
    ).toEqual({
      ...initialState,
      getUserRequest: false,
      data: { email: "test@mail.com", name: "TestUser" },
    });
  });

  it("should handle GET_USER_FAILED action", () => {
    const error = new Error("error");

    expect(
      userReducer(initialState, {
        type: GET_USER_FAILED,
        payload: error,
      })
    ).toEqual({ ...initialState, getUserRequest: false, getUserError: error });
  });

  it("should handle UPDATE_USER_REQUEST action", () => {
    expect(
      userReducer(initialState, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: true,
      updateUserError: null,
    });
  });

  it("should handle UPDATE_USER_SUCCESS action", () => {
    expect(
      userReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
        payload: { email: "test@mail.com", name: "TestUser" },
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: false,
      data: { email: "test@mail.com", name: "TestUser" },
    });
  });

  it("should handle UPDATE_USER_FAILED action", () => {
    const error = new Error("error");

    expect(
      userReducer(initialState, {
        type: UPDATE_USER_FAILED,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      updateUserRequest: false,
      updateUserError: error,
    });
  });
});
