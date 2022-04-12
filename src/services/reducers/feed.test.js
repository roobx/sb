import { feedReducer, initialState } from "./feed";

import {
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_GET_MESSAGE,
} from "../actions/feed";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FEED_CONNECTION_SUCCESS action", () => {
    expect(
      feedReducer(initialState, {
        type: FEED_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...initialState, isOpen: true, error: null });
  });

  it("should handle FEED_CONNECTION_ERROR action", () => {
    const error = new Error("error");

    expect(
      feedReducer(initialState, {
        type: FEED_CONNECTION_ERROR,
        payload: error,
      })
    ).toEqual({ ...initialState, error });
  });

  it("should handle FEED_CONNECTION_CLOSED action", () => {
    expect(
      feedReducer(
        { ...initialState, isOpen: true },
        {
          type: FEED_CONNECTION_CLOSED,
        }
      )
    ).toEqual({ ...initialState, isOpen: false });
  });

  it("should handle FEED_GET_MESSAGE action", () => {
    const data = {
      orders: [1, 2, 3],
      total: 4,
      totalToday: 5,
    };

    expect(
      feedReducer(initialState, {
        type: FEED_GET_MESSAGE,
        payload: { data },
      })
    ).toEqual({
      ...initialState,
      orders: data.orders,
      total: data.total,
      totalToday: data.totalToday,
    });
  });
});
