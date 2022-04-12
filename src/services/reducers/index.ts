import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { ordersReducer } from "./orders";
import { feedReducer } from "./feed";
import { userReducer } from "./user";

export default combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  orders: ordersReducer,
  feed: feedReducer,
  user: userReducer,
});
