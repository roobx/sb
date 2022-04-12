import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TGetIngredientsdActions,
} from "../actions/ingredients";

import { TIngredient } from "../../utils/types";

export type TGetIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: unknown;
};

export const initialState: TGetIngredientsState = {
  data: [],
  isLoading: false,
  error: null,
};

export const ingredientsReducer = (
  state = initialState,
  action: TGetIngredientsdActions
): TGetIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
