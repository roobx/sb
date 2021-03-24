import React from "react";
import "./BurgerIngredients.css";
import { Tab } from '../../burger-ui/ui';

class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className="burger-ingredients">
        <h1 className="burger-ingredients__title">Соберите бургер</h1>
        <nav>
          <ul className="burger-ingredients__menu">
            <li><Tab text='Булки' type='current' /></li>
            <li><Tab text='Соусы' /></li>
            <li><Tab text='Начинки' /></li>
          </ul> 
        </nav>
        <div className="burger-ingredients__content">
          
        </div>
      </section>
    )
  }
}

export default BurgerIngredients;
