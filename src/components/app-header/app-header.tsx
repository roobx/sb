import { NavLink, useRouteMatch } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

import { useSelector } from "../../services/store";

const AppHeader = () => {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true });
  const isFeed = !!useRouteMatch("/feed");
  const isProfile = !!useRouteMatch("/profile");

  /* В макете и задании не сказано, что нужно отображать имя пользователя в шапке
     но это допускается */
  const userName = useSelector((state) => state.user.data?.name);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} pt-4 pb-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to="/"
            className={styles.link}
            activeClassName={styles.link_active}
            exact
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            <p
              className="text text_type_main-default ml-2"
              data-cy="mainpage-link"
            >
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to="/feed"
            className={`${styles.link} ml-10`}
            activeClassName={styles.link_active}
          >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          className={`${styles.link} ${styles.link_position_last}`}
          activeClassName={styles.link_active}
        >
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
          <p
            className="text text_type_main-default ml-2"
            data-cy="profile-link"
          >
            {userName || "Личный кабинет"}
          </p>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;
