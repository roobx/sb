import PropTypes from "prop-types";

import styles from "./burger-ingredient.module.css";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types";

/* В можно лучше: вынести ингредиент в отдельный компонент */
const BurgerIngredient = ({ ingredientData, count }) => {
  const { image, price, name } = ingredientData;

  return (
    <article className={styles.article}>
      {count && <Counter count={count} />}
      <img className={styles.img} src={image} alt="картинка ингредиента." />
      <div className={`${styles.cost} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon />
      </div>
      <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
    </article>
  );
};

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  count: PropTypes.number.isRequired,
};

export default BurgerIngredient;
