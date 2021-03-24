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
          <h3 className='burger-ingredients__categories'>Булки</h3>
          <div className='burger-ingredients__items'>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>20</p>
              </div>
              <p className='burger-ingredients__description'>Краторная булка N-200i</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>20</p>
              </div>
              <p className='burger-ingredients__description'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
          <h3 className='burger-ingredients__categories'>Соусы</h3>
          <div className='burger-ingredients__items'>
          <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>30</p>
              </div>
              <p className='burger-ingredients__description'>Соус Spicy-X</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>30</p>
              </div>
              <p className='burger-ingredients__description'>Соус фирменный Space Sauce</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>30</p>
              </div>
              <p className='burger-ingredients__description'>Краторная булка N-200i</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost'>
                <p className='burger-ingredients__count'>30</p>
              </div>
              <p className='burger-ingredients__description'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
          <h3 className='burger-ingredients__categories'>Начинки</h3>
          <div className='burger-ingredients__items'>

          </div>
        </div>
      </section>
    )
  }
}

export default BurgerIngredients;
