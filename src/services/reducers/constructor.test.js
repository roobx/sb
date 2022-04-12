import { constructorReducer, initialState } from "./constructor";
import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
} from "../actions/constructor";

const mockIngredients = [
  {
    _id: 1,
    type: "main",
  },
  {
    _id: 2,
    type: "bun",
  },
  {
    _id: 3,
    type: "souce",
  },
];

describe("constructor reducer", () => {
  it("should return the initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  /* в данном случае важно простетировать оба сценария поведения,
  когда ингредиент булка и когда не булка,
  т.к. в редьюсере есть if */
  it("should handle CONSTRUCTOR_ADD action contains bun ingredient", () => {
    expect(
      constructorReducer(initialState, {
        type: CONSTRUCTOR_ADD,
        payload: mockIngredients[1],
      })
    ).toEqual({ ...initialState, bun: mockIngredients[1] });
  });

  it("should handle CONSTRUCTOR_ADD action contains not bun ingredient", () => {
    expect(
      constructorReducer(initialState, {
        type: CONSTRUCTOR_ADD,
        payload: mockIngredients[0],
      })
    ).toEqual({ ...initialState, ingredients: [mockIngredients[0]] });
  });

  it("should handle CONSTRUCTOR_DELETE action", () => {
    expect(
      constructorReducer(
        { ...initialState, ingredients: mockIngredients },
        {
          type: CONSTRUCTOR_DELETE,
          payload: 1,
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        {
          _id: 1,
          type: "main",
        },
        {
          _id: 3,
          type: "souce",
        },
      ],
    });
  });

  it("should handle CONSTRUCTOR_REORDER action", () => {
    expect(
      constructorReducer(
        { ...initialState, ingredients: mockIngredients },
        {
          type: CONSTRUCTOR_REORDER,
          payload: {
            from: 1,
            to: 0,
          },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: [
        {
          _id: 2,
          type: "bun",
        },
        {
          _id: 1,
          type: "main",
        },
        {
          _id: 3,
          type: "souce",
        },
      ],
    });
  });

  it("should handle CONSTRUCTOR_RESET action", () => {
    expect(
      constructorReducer(
        { ...initialState, ingredients: mockIngredients },
        {
          type: CONSTRUCTOR_RESET,
        }
      )
    ).toEqual(initialState);
  });
});
