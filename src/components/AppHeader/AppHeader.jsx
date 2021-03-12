import React from "react";
import "./AppHeader.css";
import { BurgerIcon, ListIcon, ProfileIcon } from "../../burger-ui/ui/icons";
import { Logo } from "../../burger-ui/ui";

class AppHeader extends React.Component {
  render() {
    return (
      <header className="header">
        <nav className="menu p-2">
          <a href="#" className="menu__link">
            <BurgerIcon type="primary" />
            <p className="text_type_main-default menu__text">
              Конструктор бургеров
            </p>
          </a>
          <a href="#" className="menu__link">
            <ListIcon type="secondary" />
            <p className="text_type_main-default menu__text">Лента заказов</p>
          </a>
          <a href="#" className="menu__link">
            <ProfileIcon type="secondary" />
            <p className="text_type_main-default menu__text">Личный кабинет</p>
          </a>
          <div className="menu__logo">
            <Logo />
          </div>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
