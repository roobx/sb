import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import {
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_SUCCESS,
  ORDERS_CONNECTION_ERROR,
  ORDERS_CONNECTION_CLOSED,
  ORDERS_CONNECTION_CLOSE,
  ORDERS_GET_MESSAGE,
  TOrdersActions,
} from "./actions/orders";

import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_SUCCESS,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_CLOSE,
  FEED_GET_MESSAGE,
  TFeedActions,
} from "./actions/feed";

import rootReducer from "./reducers";
import { TConstructorActions } from "./actions/constructor";
import { TGetIngredientsdActions } from "./actions/ingredients";
import { TOrderActions } from "./actions/order";
import { TUserActions } from "./actions/user";

const ordersWsActions = {
  wsInit: ORDERS_CONNECTION_INIT,
  wsClose: ORDERS_CONNECTION_CLOSE,
  onOpen: ORDERS_CONNECTION_SUCCESS,
  onClose: ORDERS_CONNECTION_CLOSED,
  onError: ORDERS_CONNECTION_ERROR,
  onMessage: ORDERS_GET_MESSAGE,
};

const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  wsClose: FEED_CONNECTION_CLOSE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(ordersWsActions),
      socketMiddleware(feedWsActions)
    )
  )
);

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions =
  | TConstructorActions
  | TFeedActions
  | TGetIngredientsdActions
  | TOrdersActions
  | TOrderActions
  | TUserActions;

/*
  Тут описание типизации отличается от того, что дается в теории.
  Там для AppThunk зачем то используется тип ActionCreator, что в результате 
  приводит к неправильно типизации диспатча и он не строго контролирует экшены
  Ниже приведен рабочий код, советовать его в "Можно лучше"
 */

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
