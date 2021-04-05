import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-ingredients.module.css";
import { Tab } from '../../burger-ui/ui';
import { CurrencyIcon } from "../../burger-ui/ui/icons";
import { Counter } from "../../burger-ui/ui/counter";
import img from "../../images/img.png";

const BurgerIngredients = ({ data }) => {
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
        {data.map((category, index) => {
          return (
            <div key={index}>
              <h3 className='text text_type_main-medium mt-5 mb-3'>{category.name}</h3>
              <div className={styles.items}>
                {category.items.map((article, index) => {
                  return (
                    <article className={styles.article} key={index}>
                      {article.count && <Counter count={article.count} />}
                      <img className={styles.img} src={img} alt='картинка ингредиента.' />
                      <div className={`${styles.cost} mt-1 mb-1`}>
                        <p className='text text_type_digits-default mr-1'>{article.price}</p>
                        <CurrencyIcon />
                      </div>
                      <p className='text text_type_main-default'>{article.text}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients;
