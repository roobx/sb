import { TOrder } from "../../utils/types";

export const ORDERS_CONNECTION_INIT = "ORDERS_CONNECTION_INIT";
export const ORDERS_CONNECTION_SUCCESS = "ORDERS_CONNECTION_SUCCESS";
export const ORDERS_CONNECTION_ERROR = "ORDERS_CONNECTION_ERROR";
export const ORDERS_CONNECTION_CLOSED = "ORDERS_CONNECTION_CLOSED";
export const ORDERS_CONNECTION_CLOSE = "ORDERS_CONNECTION_CLOSE";
export const ORDERS_GET_MESSAGE = "ORDERS_GET_MESSAGE";

export type TOrdersConnectionInitAction = {
  readonly type: typeof ORDERS_CONNECTION_INIT;
  readonly payload: string | URL;
};

export type TOrdersConnectionSuccessAction = {
  readonly type: typeof ORDERS_CONNECTION_SUCCESS;
  readonly payload: Event;
};

export type TOrdersConnectionErrorAction = {
  readonly type: typeof ORDERS_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TOrdersConnectionClosedAction = {
  readonly type: typeof ORDERS_CONNECTION_CLOSED;
  readonly payload: Event;
};

export type TOrdersConnectionCloseAction = {
  readonly type: typeof ORDERS_CONNECTION_CLOSE;
};

export type TOrdersGetMessageAction = {
  readonly type: typeof ORDERS_GET_MESSAGE;
  readonly payload: {
    data: {
      orders: TOrder[];
    };
    timestamp: number;
  };
};

export type TOrdersActions =
  | TOrdersConnectionInitAction
  | TOrdersConnectionSuccessAction
  | TOrdersConnectionErrorAction
  | TOrdersConnectionClosedAction
  | TOrdersConnectionCloseAction
  | TOrdersGetMessageAction;
