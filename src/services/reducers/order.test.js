import { orderReducer, initialState } from "./order";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CREATED_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle CREATE_ORDER_REQUEST action", () => {
    expect(
      orderReducer(initialState, {
        type: CREATE_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isNewOrderLoading: true,
      newOrderError: null,
    });
  });

  it("should handle CREATE_ORDER_SUCCESS action", () => {
    expect(
      orderReducer(initialState, {
        type: CREATE_ORDER_SUCCESS,
        payload: { _id: 1 },
      })
    ).toEqual({ ...initialState, newOrderData: { _id: 1 } });
  });

  it("should handle CREATE_ORDER_FAILED action", () => {
    const error = new Error("error");

    expect(
      orderReducer(initialState, {
        type: CREATE_ORDER_FAILED,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      isNewOrderLoading: false,
      newOrderError: error,
    });
  });

  it("should handle RESET_CREATED_ORDER action", () => {
    expect(
      orderReducer(
        { ...initialState, newOrderData: { _id: 1 } },
        {
          type: RESET_CREATED_ORDER,
        }
      )
    ).toEqual({ ...initialState, newOrderData: null });
  });

  
  it("should handle GET_ORDER_REQUEST action", () => {
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isOrderByNumberLoading: true,
      orderByNumberError: null,
    });
  });

  it("should handle GET_ORDER_SUCCESS action", () => {
    expect(
      orderReducer(initialState, {
        type: GET_ORDER_SUCCESS,
        payload: { orders: [{ _id: 1 }]},
      })
    ).toEqual({ ...initialState, orderByNumber: { _id: 1 } });
  });

  it("should handle GET_ORDER_FAILED action", () => {
    const error = new Error("error");

    expect(
      orderReducer(initialState, {
        type: GET_ORDER_FAILED,
        payload: error,
      })
    ).toEqual({
      ...initialState,
      isOrderByNumberLoading: false,
      orderByNumberError: error,
    });
  });
});
