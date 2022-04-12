import React from "react";

import styles from "./orders-list.module.css";

import OrderCard from "../order-card/order-card";
import { TOrder } from "../../utils/types";

type TOrdersListProps = {
  orders: TOrder[];
};

const OrdersList: React.FC<TOrdersListProps> = ({ orders }) => {
  const orderByDate = orders.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className={`${styles.content}`}>
      {orderByDate.map((order) => {
        return <OrderCard order={order} key={order._id} />;
      })}
    </div>
  );
};

export default OrdersList;
