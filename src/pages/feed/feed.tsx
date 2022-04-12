import { useEffect } from "react";

import styles from "./feed.module.css";

import OrdersList from "../../components/orders-list/orders-list";
import FeedInfo from "../../components/feed-info/feed-info";
import Preloader from "../../components/preloader/preloader";

import { useDispatch, useSelector } from "../../services/store";
import {
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
} from "../../services/actions/feed";
import { BURGER_API_WSS_FEED } from "../../utils/burger-api";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: FEED_CONNECTION_INIT,
      payload: BURGER_API_WSS_FEED,
    });

    return () => {
      dispatch({ type: FEED_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  const orders = useSelector((state) => state.feed.orders);

  if (!orders.length) {
    return (<Preloader />);
  }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Лента заказов
      </h1>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
}

export default Feed;