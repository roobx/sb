import { ingredientsReducer, initialState } from "./ingredients";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/ingredients";

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST action", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it("should handle GET_INGREDIENTS_SUCCESS action", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: [1, 2, 3],
      })
    ).toEqual({ ...initialState, data: [1, 2, 3] });
  });

  it("should handle GET_INGREDIENTS_FAILED action", () => {
    const error = new Error("error");

    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
        payload: error,
      })
    ).toEqual({ ...initialState, isLoading: false, error });
  });
});
