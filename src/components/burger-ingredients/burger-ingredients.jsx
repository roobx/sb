import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import img from "../../images/img.png";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Tab
              value="Булки"
              active={current === "Булки"}
              onClick={setCurrent}
            >
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value="Соусы"
              active={current === "Соусы"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab
              value="Начинки"
              active={current === "Начинки"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>
        <div>
          <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
          <div className={styles.items}>
            {ingredients
              .filter((c) => c.type === "bun")
              .map((article, index) => {
                return (
                  <article className={styles.article} key={index}>
                    {article.count && <Counter count={article.count} />}
                    <img
                      className={styles.img}
                      src={article.image}
                      alt="картинка ингредиента."
                    />
                    <div className={`${styles.cost} mt-2 mb-2`}>
                      <p className="text text_type_digits-default mr-2">
                        {article.price}
                      </p>
                      <CurrencyIcon />
                    </div>
                    <p className={`text text_type_main-default ${styles.text}`}>
                      {article.name}
                    </p>
                  </article>
                );
              })}
          </div>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
          <div className={styles.items}>
            {ingredients
              .filter((c) => c.type === "sauce")
              .map((article, index) => {
                return (
                  <article className={styles.article} key={index}>
                    {article.count && <Counter count={article.count} />}
                    <img
                      className={styles.img}
                      src={article.image}
                      alt="картинка ингредиента."
                    />
                    <div className={`${styles.cost} mt-2 mb-2`}>
                      <p className="text text_type_digits-default mr-2">
                        {article.price}
                      </p>
                      <CurrencyIcon />
                    </div>
                    <p className={`text text_type_main-default ${styles.text}`}>
                      {article.name}
                    </p>
                  </article>
                );
              })}
          </div>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <div className={styles.items}>
            {ingredients
              .filter((c) => c.type === "main")
              .map((article, index) => {
                return (
                  <article className={styles.article} key={index}>
                    {article.count && <Counter count={article.count} />}
                    <img
                      className={styles.img}
                      src={article.image}
                      alt="картинка ингредиента."
                    />
                    <div className={`${styles.cost} mt-2 mb-2`}>
                      <p className="text text_type_digits-default mr-2">
                        {article.price}
                      </p>
                      <CurrencyIcon />
                    </div>
                    <p className={`text text_type_main-default ${styles.text}`}>
                      {article.name}
                    </p>
                  </article>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerIngredients;
