import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-info.module.css";

import OrderStatus from "../order-status/order-status";
import Preloader from "../preloader/preloader";

import { TIngredient } from "../../utils/types";
import { formatPastTime } from "../../utils/date-format";
import { useSelector, useDispatch } from "../../services/store";
import { getOrderByNumber } from "../../services/actions/order";

export const OrderInfo = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.data);

  /* Ищем в сторе данные открываемого заказа по его номеру, можно разместить поиск 
  здесь, но компонент OrderInfo будет более переиспользуемым, если данные 
  передавать в пропсы  */
  const orderData = useSelector((state) => {
    if (state.orders.isOpen && state.orders.data.length) {
      const data = state.orders.data.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.feed.isOpen && state.feed.orders.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.order.orderByNumber?.number === +number) {
      return state.order.orderByNumber;
    }

    return null;
  });

  /* Если заказа в сторе нет, то запрашиваем его */
  useEffect(() => {
    if (!orderData) {
      dispatch(getOrderByNumber(+number));
    }
  }, [dispatch, orderData, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = formatPastTime(new Date(orderData.createdAt));

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrap}>
      <h3 className={`text text_type_main-medium  pb-3 pt-10 ${styles.header}`}>
        {orderInfo.name}
      </h3>
      <OrderStatus status={orderInfo.status} />
      <p className={`text text_type_main-medium pt-15 pb=6`}>Состав:</p>
      <ul className={`${styles.list} mb-8`}>
        {Object.values(orderInfo.ingredientsInfo).map((item, index) => {
          return (
            <li className={`pb-4 pr-6 ${styles.item}`} key={index}>
              <div className={styles.img_wrap}>
                <div className={styles.border}>
                  <img
                    className={styles.img}
                    src={item.image_mobile}
                    alt={item.name}
                  />
                </div>
              </div>
              <span className="text text_type_main-default pl-4">
                {item.name}
              </span>
              <span
                className={`text text_type_digits-default pl-4 pr-4 ${styles.quantity}`}
              >
                {item.count} x {item.price}
              </span>
              <CurrencyIcon type={"primary"} />
            </li>
          );
        })}
      </ul>
      <div className={styles.bottom}>
        <p className="text text_type_main-default text_color_inactive">
          {orderInfo.date}
        </p>
        <span className={`text text_type_digits-default pr-4 ${styles.total}`}>
          {orderInfo.total}
        </span>
        <CurrencyIcon type={"primary"} />
      </div>
    </div>
  );
};

export default OrderInfo;
