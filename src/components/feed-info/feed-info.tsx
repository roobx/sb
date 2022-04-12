import React from "react";

import styles from "./feed-info.module.css";

import { useSelector } from "../../services/store";
import { TOrder } from "../../utils/types";

type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

const HalfColumn: React.FC<HalfColumnProps> = ({
  orders,
  title,
  textColor,
}) => {
  return (
    <div className={`pr-6 ${styles.column}`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
      <ul className={`pt-6  ${styles.list}`}>
        {orders.map((item, index) => {
          return (
            <li
              className={`text text_type_digits-default ${styles.list_item}`}
              style={{ color: textColor === "blue" ? "#00cccc" : "#F2F2F3" }}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type TColumnProps = {
  title: string;
  content: number;
};

const Column: React.FC<TColumnProps> = ({ title, content }) => {
  return (
    <>
      <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
        {title}:
      </h3>
      <p className={`text text_type_digits-large ${styles.content}`}>
        {content}
      </p>
    </>
  );
};

const getOrders = (orders: TOrder[], status: string): number[] => {
  return orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);
};

const FeedInfo = () => {
  const { total, totalToday } = useSelector((state) => state.feed);
  const readyOrders = useSelector((state) =>
    getOrders(state.feed.orders, "done")
  );
  const pendingOrders = useSelector((state) =>
    getOrders(state.feed.orders, "pending")
  );

  return (
    <section>
      <div className={styles.columns}>
        <HalfColumn orders={readyOrders} title={"Готовы"} textColor={"blue"} />
        <HalfColumn orders={pendingOrders} title={"В работе"} />
      </div>
      <Column title={"Выполнено за все время"} content={total} />
      <Column title={"Выполнено за сегодня"} content={totalToday} />
    </section>
  );
};

export default FeedInfo;
