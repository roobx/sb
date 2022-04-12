import { useSelector } from "../../services/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./main.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Preloader from "../../components/preloader/preloader";

const ConstructorPage = () => {
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles.main}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </main>
  );
};

export default ConstructorPage;
