import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-card.module.css";

import OrderStatus from "../order-status/order-status";
import { TOrder, TIngredient } from "../../utils/types";

import { useSelector } from "../../services/store";
import { formatPastTime } from "../../utils/date-format";

type TOrderCardProps = {
  order: TOrder;
};

const OrderCard: React.FC<TOrderCardProps> = ({ order }) => {
  const location = useLocation();
  const maxIngredients = 6;

  const ingredients = useSelector((state) => state.ingredients.data);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = formatPastTime(new Date(order.createdAt));
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date,
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${orderInfo.number}`,
        state: { background: location },
      }}
      className={`p-6 mb-4 mr-2 ${styles.order}`}
    >
      <div className={styles.order_info}>
        <span className={`text text_type_digits-default ${styles.number}`}>
          #{String(orderInfo.number).padStart(6, "0")}
        </span>
        <span className="text text_type_main-default text_color_inactive">
          {orderInfo.date}
        </span>
      </div>
      <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
        {orderInfo.name}
      </h4>
      {location.pathname === "/profile/orders" && (
        <OrderStatus status={orderInfo.status} />
      )}
      <div className={`pt-6 ${styles.order_content}`}>
        <ul className={styles.ingredients}>
          {orderInfo.ingredientsToShow.map((ingredient, index) => {
            let zIndex = maxIngredients - index;
            let right = 20 * index;
            return (
              <li
                className={styles.img_wrap}
                style={{ zIndex: zIndex, right: right }}
                key={index}
              >
                <img
                  style={{
                    opacity:
                      orderInfo.remains && maxIngredients === index + 1
                        ? "0.5"
                        : "1",
                  }}
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                {maxIngredients === index + 1 ? (
                  <span
                    className={`text text_type_digits-default ${styles.remains}`}
                  >
                    {orderInfo.remains > 0 ? `+${orderInfo.remains}` : null}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div>
          <span
            className={`text text_type_digits-default pr-1 ${styles.order_total}`}
          >
            {orderInfo.total}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
