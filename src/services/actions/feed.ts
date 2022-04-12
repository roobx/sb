import { TOrder } from "../../utils/types";

export const FEED_CONNECTION_INIT = "FEED_CONNECTION_INIT";
export const FEED_CONNECTION_SUCCESS = "FEED_CONNECTION_SUCCESS";
export const FEED_CONNECTION_ERROR = "FEED_CONNECTION_ERROR";
export const FEED_CONNECTION_CLOSED = "FEED_CONNECTION_CLOSED";
export const FEED_CONNECTION_CLOSE = "FEED_CONNECTION_CLOSE";
export const FEED_GET_MESSAGE = "FEED_GET_MESSAGE";

export type TFeedConnectionInitAction = {
  readonly type: typeof FEED_CONNECTION_INIT;
  readonly payload: string | URL;
};

export type TFeedConnectionSuccessAction = {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
  readonly payload: Event;
};

export type TFeedConnectionErrorAction = {
  readonly type: typeof FEED_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TFeedConnectionClosedAction = {
  readonly type: typeof FEED_CONNECTION_CLOSED;
  readonly payload: Event;
};

export type TFeedConnectionCloseAction = {
  readonly type: typeof FEED_CONNECTION_CLOSE;
};

export type TFeedGetMessageAction = {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: {
    data: {
      orders: TOrder[];
      total: number;
      totalToday: number;
    };
    timestamp: number;
  };
};

export type TFeedActions =
  | TFeedConnectionInitAction
  | TFeedConnectionSuccessAction
  | TFeedConnectionErrorAction
  | TFeedConnectionClosedAction
  | TFeedConnectionCloseAction
  | TFeedGetMessageAction;
