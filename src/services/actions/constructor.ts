import { v4 as uuid } from "uuid";

import { TIngredient, TConstructorIngredient } from "../../utils/types";

/*
    В теории курса предлагается дополнительно указывать
    литеральный тип:
    export const CONSTRUCTOR_ADD: 'CONSTRUCTOR_ADD' = 'CONSTRUCTOR_ADD';
    но он не обязателен, т.к. объевление const в данном
    случае и так будет интерпретироваться как литеральный тип
    Поэтому достаточно: 
    const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD';
*/
export const CONSTRUCTOR_ADD = "CONSTRUCTOR_ADD";
export const CONSTRUCTOR_DELETE = "CONSTRUCTOR_DELETE";
export const CONSTRUCTOR_REORDER = "CONSTRUCTOR_REORDER";
export const CONSTRUCTOR_RESET = "CONSTRUCTOR_RESET";

export type TConstructorAddAction = {
  readonly type: typeof CONSTRUCTOR_ADD;
  readonly payload: TConstructorIngredient;
};

export type TConstructorDeleteAction = {
  readonly type: typeof CONSTRUCTOR_DELETE;
  readonly payload: number;
};

export type TConstructorReorderAction = {
  readonly type: typeof CONSTRUCTOR_REORDER;
  readonly payload: {
    from: number;
    to: number;
  };
};

export type TConstructorResetction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

export type TConstructorActions =
  | TConstructorAddAction
  | TConstructorDeleteAction
  | TConstructorReorderAction
  | TConstructorResetction;

export const addToConstructor = (
  ingredient: TIngredient
): TConstructorAddAction => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: {
      ...ingredient,
      id: uuid(),
    },
  };
};
