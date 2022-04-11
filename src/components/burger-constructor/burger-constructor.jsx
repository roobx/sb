import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

import { ingredientPropType } from "../../utils/prop-types";

const BurgerConstructor = ({ constructorIngredients }) => {
  const bun = constructorIngredients.find(
    (ingredient) => ingredient.type === "bun"
  );
  const ingredients = constructorIngredients.filter(
    (ingredient) => ingredient.type !== "bun"
  );

  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <ul className={styles.elements}>
        {ingredients.map((item, index) => {
          return (
            <li className={`${styles.element} mb-4 mr-2`} key={index}>
              <DragIcon />
              <div className={`${styles.element_fullwidth} ml-2`}>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>610</p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large" children="Оформить заказ" />
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  constructorIngredients: PropTypes.arrayOf(ingredientPropType.isRequired)
    .isRequired,
};

export default BurgerConstructor;
