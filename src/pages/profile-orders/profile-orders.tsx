import { useEffect } from "react";

import styles from "./profile-orders.module.css";

import ProfileMenu from "../../components/profile-menu/profile-menu";
import OrdersList from "../../components/orders-list/orders-list";

import { BURGER_API_WSS_ORDERS } from "../../utils/burger-api";
import { useDispatch, useSelector } from "../../services/store";
import {
  ORDERS_CONNECTION_INIT,
  ORDERS_CONNECTION_CLOSE,
} from "../../services/actions/orders";
import { getCookie } from "../../utils/cookie";


const ProfileOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.data);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      return;
    }

    dispatch({
      type: ORDERS_CONNECTION_INIT,
      payload: `${BURGER_API_WSS_ORDERS}?token=${accessToken.replace(
        "Bearer ",
        ""
      )}`,
    });

    return () => {
      dispatch({
        type: ORDERS_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};

export default ProfileOrder;
