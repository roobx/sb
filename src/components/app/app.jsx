import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./app.module.css";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor constructorIngredients={data} />
      </main>
    </div>
  );
}

export default App;
