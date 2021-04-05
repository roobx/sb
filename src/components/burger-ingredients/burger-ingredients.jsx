import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '../../burger-ui/ui';
import { CurrencyIcon } from "../../burger-ui/ui/icons";
import { Counter } from "../../burger-ui/ui/counter";
import img from "../../images/img.png";

class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <li><Tab text='Булки' type='current' /></li>
            <li><Tab text='Соусы' /></li>
            <li><Tab text='Начинки' /></li>
          </ul>
        </nav>
        <div className={styles.content}>
          <h3 className='text text_type_main-medium mt-5 mb-3'>Булки</h3>
          <div className={styles.items}>
            <article className={styles.article}>
              <Counter count='1' />
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Краторная булка N-200i</p>
            </article>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
          <h3 className='text text_type_main-medium mt-5 mb-3'>Соусы</h3>
          <div className={styles.items}>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Соус Spicy-X</p>
            </article>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Соус фирменный Space Sauce</p>
            </article>
            <article className={styles.article}>
              <Counter count='1' />
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Краторная булка N-200i</p>
            </article>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>30</p>
                <CurrencyIcon />

              </div>
              <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
          <h3 className='text text_type_main-medium mt-5 mb-3'>Начинки</h3>
          <div className={styles.items}>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Краторная булка N-200i</p>
            </article>
            <article className={styles.article}>
              <img className={styles.img} src={img} alt='картинка ингредиента.' />
              <div className={`${styles.cost} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-1'>20</p>
                <CurrencyIcon />
              </div>
              <p className='text text_type_main-default'>Флюоресцентная булка R2-D3</p>
            </article>
          </div>
        </div>
      </section>
    )
  }
}

export default BurgerIngredients;
