import React from "react";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredient.module.css";

import { TIngredient } from "../../utils/types";

type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count: number;
};

const BurgerIngredient: React.FC<TBurgerIngredientProps> = ({
  ingredient,
  count,
}) => {
  const location = useLocation();
  const { image, price, name, _id } = ingredient;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "NEW_INGREDIENT",
    item: ingredient,

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;

  return (
    <Link
      className={styles.article}
      to={{
        pathname: `/ingredients/${_id}`,
        state: { background: location },
      }}
      style={{ opacity }}
      ref={drag}
    >
      {count && <Counter count={count} />}
      <img className={styles.img} src={image} alt="картинка ингредиента." />
      <div className={`${styles.cost} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
    </Link>
  );
};

//export default BurgerIngredient;
export default React.memo(BurgerIngredient);
