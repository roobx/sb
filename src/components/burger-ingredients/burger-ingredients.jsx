import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import styles from "./burger-ingredients.module.css";
import { ingredientPropType } from "../../utils/prop-types";

const BurgerIngredients = ({ ingredients }) => {
  const [currentTab, setCurrentTab] = React.useState("buns");

  const buns = ingredients.filter((item) => item.type === "bun");
  const mains = ingredients.filter((item) => item.type === "main");
  const sauces = ingredients.filter((item) => item.type === "sauce");

  /* В можно лучше: скролл к разделу при клике на таб */
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
            Булки
          </Tab>
          <Tab
            value="mains"
            active={currentTab === "mains"}
            onClick={onTabClick}
          >
            Начинки
          </Tab>
          <Tab
            value="sauces"
            active={currentTab === "sauces"}
            onClick={onTabClick}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.content}>
        <IngredientsCategory title="Булки" titleId="buns" ingredients={buns} />
        <IngredientsCategory
          title="Начинки"
          titleId="mains"
          ingredients={mains}
        />
        <IngredientsCategory
          title="Соусы"
          titleId="sauces"
          ingredients={sauces}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
