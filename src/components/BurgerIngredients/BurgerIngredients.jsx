import React from "react";
import "./BurgerIngredients.css";
import { ConstructorElement, Tab } from '../../burger-ui/ui';
import { CurrencyIcon, DragIcon, LockIcon } from "../../burger-ui/ui/icons";
import { Counter } from "../../burger-ui/ui/counter";

class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className="burger-ingredients">
        <h1 className="text text_type_main-large mt-5 mb-3">Соберите бургер</h1>
        <nav>
          <ul className="burger-ingredients__menu">
            <li><Tab text='Булки' type='current' /></li>
            <li><Tab text='Соусы' /></li>
            <li><Tab text='Начинки' /></li>
          </ul> 
        </nav>
        <div className="burger-ingredients__content">
          <h3 className='text text_type_main-medium mt-5 mb-3'>Булки</h3>
          <div className='burger-ingredients__items'>
            <article className='burger-ingredients__article'>
              <Counter count='1' />
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Краторная булка N-200i</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
          <h3 className='text text_type_main-medium mt-5 mb-3'>Соусы</h3>
          <div className='burger-ingredients__items'>
          <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Соус Spicy-X</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Соус фирменный Space Sauce</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Краторная булка N-200i</p>
            </article>
            <article className='burger-ingredients__article'>
              <img className='burger-ingredients__img' src='#' alt='картинка ингредиента.' />
              <div className='burger-ingredients__cost mt-1 mb-1'>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
                
              </div>
              <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
            </article>
            <LockIcon />
            <ConstructorElement />
            <DragIcon />
          </div>
        </div>
      </section>
    )
  }
}

export default BurgerIngredients;
