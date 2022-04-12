import { ordersReducer, initialState } from "./orders";

import {
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_GET_MESSAGE,
} from "../actions/orders";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(ordersReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ORDERS_CONNECTION_SUCCESS action", () => {
    expect(
      ordersReducer(initialState, {
        type: ORDERS_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...initialState, isOpen: true, error: null });
  });

  it("should handle ORDERS_CONNECTION_ERROR action", () => {
    const error = new Error("error");

    expect(
      ordersReducer(initialState, {
        type: ORDERS_CONNECTION_ERROR,
        payload: error,
      })
    ).toEqual({ ...initialState, error });
  });

  it("should handle ORDERS_CONNECTION_CLOSED action", () => {
    expect(
      ordersReducer(
        { ...initialState, isOpen: true },
        {
          type: ORDERS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({ ...initialState, isOpen: false });
  });

  it("should handle ORDERS_GET_MESSAGE action", () => {
    const orders = [1, 2, 3];

    expect(
      ordersReducer(initialState, {
        type: ORDERS_GET_MESSAGE,
        payload: { data: { orders } },
      })
    ).toEqual({
      ...initialState,
      data: orders,
    });
  });
});
