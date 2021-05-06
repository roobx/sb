import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import img from "../../images/img-small.png";

const BurgerConstructor = ({ constructor }) => {
  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`Краторная булка N-200i (верх)`}
          price={1255}
          thumbnail={img}
        />
      </div>
      <ul className={styles.elements}>
        {constructor.map((item, index) => {
          if (item.type === "bun") {
            return null;
          }
          return (
            <li className={`${styles.element} mb-4 mr-2`} key={index}>
              <DragIcon />
              <div className={`${styles.element_fullwidth} ml-2`}>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`Краторная булка N-200i (низ)`}
          price={1255}
          thumbnail={img}
        />
      </div>
      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>610</p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large" children="Оформить заказ" />
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default BurgerConstructor;
