import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients.module.css";

import IngredientsCategory from "../ingredients-category/ingredients-category";

import { useSelector } from "../../services/store";

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = React.useState("buns");

  const ingredients = useSelector((state) => state.ingredients.data);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("buns");
    } else if (inViewSauces) {
      setCurrentTab("sauces");
    } else if (inViewFilling) {
      setCurrentTab("mains");
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  /* В можно лучше: скролл к разделу при клике на таб */
  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab
              value="buns"
              active={currentTab === "buns"}
              onClick={onTabClick}
            >
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
        <div className={styles.content} data-cy="ingredients">
          <IngredientsCategory
            title="Булки"
            titleId="buns"
            ingredients={buns}
            ref={bunsRef}
          />
          <IngredientsCategory
            title="Начинки"
            titleId="mains"
            ingredients={mains}
            ref={mainsRef}
          />
          <IngredientsCategory
            title="Соусы"
            titleId="sauces"
            ingredients={sauces}
            ref={saucesRef}
          />
        </div>
      </section>
    </>
  );
};

export default BurgerIngredients;
