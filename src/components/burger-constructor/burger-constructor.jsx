import React from "react";
import PropTypes from 'prop-types';
import { Button, ConstructorElement } from "../../burger-ui/ui";
import { CurrencyIcon, DragIcon } from "../../burger-ui/ui/icons";
import styles from "./burger-constructor.module.css";
import img from "../../images/img-small.png"

const BurgerConstructor = ({ data }) => {
  return (
    <section className={styles.burger_constructor}>
      <div className={`${styles.element} mb-2 mr-2`}>
        <ConstructorElement type='top' isLocked text='Краторная булка N-200i (верх)' price={20} thumbnail={img} />
      </div>
      <ul className={styles.elements}>
        {data.map((item, index) => {
          return (
            <li className={`${styles.element} mb-2 mr-1`} key={index}>
              <DragIcon />
              <ConstructorElement text={item.text} price={item.price} thumbnail={img} />
            </li>
          )
        })}
      </ul>
      <div className={`${styles.element} mt-2 mr-2`}>
        <ConstructorElement type='bottom' isLocked text='Краторная булка N-200i (низ)' price={20} thumbnail={img} />
      </div>
      <div className={`${styles.total} mt-5 mr-2`}>
        <div className={`${styles.cost} mr-5`}>
          <p className={`text ${styles.text} mr-1`}>610</p>
          <CurrencyIcon />
        </div>
        <Button type='primary' size='large' children='Оформить заказ' />
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor;
