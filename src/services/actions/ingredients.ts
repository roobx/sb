import { getIngredients as getIngredientsApi } from "../../utils/burger-api";
import { AppThunk } from "../store";

import { TIngredient } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: unknown;
};

export type TGetIngredientsdActions =
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;

export const getIngredients = (): AppThunk<Promise<unknown>> => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  return getIngredientsApi()
    .then((ingredients) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: ingredients,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
        payload: err,
      });
    });
};
