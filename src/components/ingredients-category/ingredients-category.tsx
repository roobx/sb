import React, { useMemo } from "react";

import styles from "./ingredients-category.module.css";

import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { useSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";

type TIngredientsCategoryProps = {
  title: string;
  titleId: string;
  ingredients: TIngredient[];
};

const IngredientsCategory = React.forwardRef<
  HTMLDivElement,
  TIngredientsCategoryProps
>(({ title, titleId, ingredients }, ref) => {
  const burgerConstructor = useSelector((state) => state.burgerConstructor);

  /* рассчет счетчиков ингредиентов в заказе */
  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <>
      <h3 className="text text_type_main-medium mt-10 mb-6" id={titleId}>
        {title}
      </h3>
      <div className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient
              ingredient={ingredient}
              key={ingredient._id}
              count={ingredientsCounters[ingredient._id]}
            />
          );
        })}
      </div>
    </>
  );
});

//export default IngredientsCategory;
export default React.memo(IngredientsCategory);
