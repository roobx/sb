import { useParams } from "react-router";
import { useSelector } from "../../services/store";

import styles from "./ingredient-details.module.css";

import Preloader from "../preloader/preloader";

export const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state) => {
    return state.ingredients.data.find((item) => item._id === id);
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredientData;

  return (
    <div className={styles.content}>
      <img
        className={styles.img}
        alt="изображение ингредиента."
        src={image_large}
      />
      <h3 className="text text_type_main-medium mt-2 mb-4">{name}</h3>
      <p className="text text_type_main-default mb-4"></p>
      <ul className={`${styles.nutritional_values} text_type_main-default`}>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Калории, ккал</p>
          <p className={`text text_type_digits-default`}>{calories}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Белки, г</p>
          <p className={`text text_type_digits-default`}>{proteins}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Жиры, г</p>
          <p className={`text text_type_digits-default`}>{fat}</p>
        </li>
        <li className={styles.nutritional_value}>
          <p className={`text mb-2 ${styles.text}`}>Углеводы, г</p>
          <p className={`text text_type_digits-default`}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
