import { NavLink, useLocation } from "react-router-dom";

import styles from "./profile-menu.module.css";

import { useDispatch } from "../../services/store";
import { logoutUser } from "../../services/actions/user";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <NavLink
        exact
        to={"/profile"}
        activeClassName={styles.activeLink}
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.link}`}
      >
        Профиль
      </NavLink>
      <NavLink
        exact
        to={"/profile/orders"}
        activeClassName={styles.activeLink}
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.link}`}
      >
        История заказов
      </NavLink>
      <button
        className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${styles.button}`}
        onClick={handleLogout}
      >
        Выход
      </button>
      <p className="pt-20 text text_type_main-default text_color_inactive">
        {location.pathname === "/profile"
          ? "В этом разделе вы можете изменить свои персональные данные"
          : "В этом разделе вы можете просмотреть свою историю заказов"}
      </p>
    </>
  );
};

export default ProfileMenu;
