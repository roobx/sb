import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_CREATED_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions,
} from "../actions/order";

import { TOrder } from "../../utils/types";

export type TOrderState = {
  newOrderData: TOrder | null;
  isNewOrderLoading: boolean;
  newOrderError: unknown;

  orderByNumber: TOrder | null;
  isOrderByNumberLoading: boolean;
  orderByNumberError: unknown;
};

export const initialState: TOrderState = {
  newOrderData: null,
  isNewOrderLoading: false,
  newOrderError: null,

  orderByNumber: null,
  isOrderByNumberLoading: false,
  orderByNumberError: null,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isNewOrderLoading: true,
        newOrderError: null,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        newOrderData: action.payload,
        isNewOrderLoading: false,
        newOrderError: null,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        isNewOrderLoading: false,
        newOrderError: action.payload,
      };
    }
    case RESET_CREATED_ORDER: {
      return {
        ...state,
        newOrderData: null,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isOrderByNumberLoading: true,
        orderByNumberError: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderByNumber: action.payload.orders[0],
        isOrderByNumberLoading: false,
        orderByNumberError: null,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        isOrderByNumberLoading: false,
        orderByNumberError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
