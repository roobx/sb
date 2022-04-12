import { useSelector } from "../../services/store";
import { Redirect, Route, useLocation, RouteProps } from "react-router";
import { Location } from "history"

import Preloader from "../preloader/preloader";

/*
  Реализация ProtectedRoute может отличаться от приведенной
  Вызов проверки авторизации размещен в App, но его и можно разместить и здесь
  Так же вместо флага onlyUnAuth защиты страницы от авторизированного пользователся
  допускается создавать два разных компонента ProtectedRoute

  Главное, что бы работа авторизации соответствовала заданию
*/
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
  ...rest
}) => {
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data);
  const location = useLocation<{ from: Location}>();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (!onlyUnAuth && !user) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;