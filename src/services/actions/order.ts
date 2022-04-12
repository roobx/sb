import {
  orderBurger as orderBurgerApi,
  getOrderByNumber as getOrderByNumberApi,
} from "../../utils/burger-api";
import { CONSTRUCTOR_RESET } from "./constructor";

import { TOrder } from "../../utils/types";
import { AppThunk } from "../store";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const RESET_CREATED_ORDER = "RESET_CREATED_ORDER";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export type TCreateOrderRequestAction = {
  readonly type: typeof CREATE_ORDER_REQUEST;
};

export type TCreateOrderSuccessAction = {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: TOrder;
};

export type TCreateOrderFailedAction = {
  readonly type: typeof CREATE_ORDER_FAILED;
  readonly payload: unknown;
};

export type TResetCreatedOrderAction = {
  readonly type: typeof RESET_CREATED_ORDER;
};

export type TGetOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: {
    orders: TOrder[];
  };
};

export type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED;
  readonly payload: unknown;
};

export type TOrderActions =
  | TCreateOrderRequestAction
  | TCreateOrderSuccessAction
  | TCreateOrderFailedAction
  | TResetCreatedOrderAction
  | TGetOrderRequestAction
  | TGetOrderSuccessAction
  | TGetOrderFailedAction;

export const orderBurger =
  (orderData: string[]): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    return orderBurgerApi(orderData)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          payload: res.order,
        });
        dispatch({
          type: CONSTRUCTOR_RESET,
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_ORDER_FAILED,
          payload: err,
        });
      });
  };

export const getOrderByNumber =
  (number: number): AppThunk<Promise<unknown>> =>
  (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    return getOrderByNumberApi(number)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
          payload: err,
        });
      });
  };
