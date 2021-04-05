import React from "react";
import styles from "./app-header.module.css";
import { BurgerIcon, ListIcon, ProfileIcon } from "../../burger-ui/ui/icons";
import { Logo } from "../../burger-ui/ui";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-2`}>
        <a href="#" className={styles.link}>
          <BurgerIcon type="primary" />
          <p className={`text_type_main-default ${styles.text}`}>
            Конструктор бургеров
          </p>
        </a>
        <a href="#" className={styles.link}>
          <ListIcon type="secondary" />
          <p className={`text_type_main-default ${styles.text}`}>Лента заказов</p>
        </a>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a href="#" className={styles.link}>
          <ProfileIcon type="secondary" />
          <p className={`text_type_main-default ${styles.text}`}>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
