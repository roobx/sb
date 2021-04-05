import React from "react";
import { Button, ConstructorElement } from "../../burger-ui/ui";
import { CurrencyIcon, DragIcon } from "../../burger-ui/ui/icons";
import styles from "./burger-constructor.module.css";
import img from "../../images/img-small.png"

class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={styles.burger_constructor}>
        <div className={`${styles.element} mb-2 mr-2`}>
          <ConstructorElement type='top' isLocked text='Краторная булка N-200i (верх)' price={20} thumbnail={img} />
        </div>
        <ul className={styles.elements}>
          <li className={`${styles.element} mb-2 mr-1`}>
            <DragIcon />
            <ConstructorElement text='Соус традиционный галактический' price={30} thumbnail={img} />
          </li>
          <li className={`${styles.element} mb-2 mr-1`}>
            <DragIcon />
            <ConstructorElement text='Мясо бессмертных моллюсков Protostomia' price={300} thumbnail={img} />
          </li>
          <li className={`${styles.element} mb-2 mr-1`}>
            <DragIcon />
            <ConstructorElement text='Плоды Фалленианского дерева' price={80} thumbnail={img} />
          </li>
          <li className={`${styles.element} mb-2 mr-1`}>
            <DragIcon />
            <ConstructorElement text='Хрустящие минеральные кольца' price={80} thumbnail={img} />
          </li>
          <li className={`${styles.element} mb-2 mr-1`}>
            <DragIcon />
            <ConstructorElement text='Хрустящие минеральные кольца' price={80} thumbnail={img} />
          </li>
          <li className={`${styles.element} mr-1`}>
            <DragIcon />
            <ConstructorElement text='Хрустящие минеральные кольца' price={80} thumbnail={img} />
          </li>
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
}

export default BurgerConstructor;
