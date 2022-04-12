import { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Preloader from "../preloader/preloader";

import { useDispatch, useSelector } from "../../services/store";
import { addToConstructor } from "../../services/actions/constructor";
import { orderBurger, RESET_CREATED_ORDER } from "../../services/actions/order";
import { TIngredient } from "../../utils/types";

const BurgerConstructor = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.order.isNewOrderLoading);
  const orderModalData = useSelector((state) => state.order.newOrderData);
  const user = useSelector((state) => state.user.data);

  const [{ canDrop, dragItem }, drop] = useDrop(() => ({
    accept: "NEW_INGREDIENT",
    drop: (item: TIngredient) => dispatch(addToConstructor(item)),
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
      isOver: monitor.isOver(),
    }),
  }));

  const dragBuns = canDrop && dragItem && dragItem.type === "bun";
  const dragIngredients = canDrop && dragItem && dragItem.type !== "bun";

  const onOrderClick = () => {
    if (!user) {
      history.push("/login");
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id,
      ])
    );
  };
  const closeOrderModal = () => dispatch({ type: RESET_CREATED_ORDER });

  /*
    Это предпочтительная реализация выполнения подсчета стоимости
    Использовать для подсчета стоимости useReducer как 
    предложено в задании не имеет смысла
  */
  const price = useMemo(() => {
    return (
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorItems]);

  return (
    <section
      className={styles.burger_constructor}
      ref={drop}
      data-cy="constructor"
    >
      {constructorItems.bun ? (
        <div
          className={`${styles.element} mb-4 mr-4`}
          data-cy="constructor-bun-1"
        >
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${constructorItems.bun.name} (верх)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${dragBuns && styles.dragActive} ${
            styles.noBunsTop
          } ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}
      <ul className={styles.elements} data-cy="constructor-ingredients">
        {constructorItems.ingredients.length > 0 ? (
          constructorItems.ingredients.map((item, index) => {
            return (
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                key={item.id}
              />
            );
          })
        ) : (
          <div
            className={`${styles.noBuns} ${
              dragIngredients && styles.dragActive
            } ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите начинку
          </div>
        )}
      </ul>
      {constructorItems.bun ? (
        <div
          className={`${styles.element} mt-4 mr-4`}
          data-cy="constructor-bun-2"
        >
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${constructorItems.bun.name} (низ)`}
            price={constructorItems.bun.price}
            thumbnail={constructorItems.bun.image}
          />
        </div>
      ) : (
        <div
          className={`${styles.noBuns} ${dragBuns && styles.dragActive} ${
            styles.noBunsBottom
          } ml-8 mb-4 mr-5 text text_type_main-default`}
        >
          Выберите булки
        </div>
      )}
      <div className={`${styles.total} mt-10 mr-4`} data-cy="order-summ">
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          children="Оформить заказ"
          onClick={onOrderClick}
        />
      </div>
      {/* Прелоадер в данном месте в "Можно лучше" */}
      {orderRequest && (
        <Modal onClose={closeOrderModal} title={"Оформляем заказ..."}>
          <Preloader />
        </Modal>
      )}

      {orderModalData && (
        <Modal
          onClose={closeOrderModal}
          title={orderRequest ? "Оформляем заказ..." : ""}
        >
          <OrderDetails orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
