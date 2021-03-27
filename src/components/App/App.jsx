import AppHeader from "../AppHeader/AppHeader";
import "./App.css";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <h1 className="app__title text text_type_main-large mt-5">Соберите бургер</h1>
      <main className="main">
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
