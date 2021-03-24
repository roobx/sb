import AppHeader from "../AppHeader/AppHeader";
import "./App.css";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="main">
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
