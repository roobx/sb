import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredients-category.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

/* В можно лучше: вынести категорию в отдельный компонент */
const IngredientsCategory = ({ title, titleId, ingredients }) => {
  return (
    <>
      <h3 className="text text_type_main-medium mt-10 mb-6" id={titleId}>
        {title}
      </h3>
      <div className={styles.items}>
        {ingredients.map((ingredient) => {
          return (
            <BurgerIngredient
              ingredientData={ingredient}
              key={ingredient._id}
              count={1}
            />
          );
        })}
      </div>
    </>
  );
};

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  titleId: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default IngredientsCategory;
