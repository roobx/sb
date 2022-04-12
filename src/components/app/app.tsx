import { useEffect } from "react";
import { useDispatch } from "../../services/store";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router";
import { Location } from "history";

import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import Profile from "../../pages/profile/profile";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientsDetails from "../ingredient-details/ingredient-details";
import ResetPassword from "../../pages/reset-password/reset-password";
import OrderInfo from "../order-info/order-info";
import NotFound404 from "../../pages/not-fount-404/not-fount-404";
import Feed from "../../pages/feed/feed";

import { getIngredients } from "../../services/actions/ingredients";
import { checkUserAuth } from "../../services/actions/user";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ background: Location }>();

  /* При обновлении страницы допускается, что бы остался отображаться открытый попап
  а не открылась страница, дополнительные проверки тут не обязательно делать */
  const background = location.state && location.state.background;

  /* это нужно для отображения номера заказа в заголовке модального окна, 
  если оно открыто. Реализация этого может отличаться */
  const orderNumber = useRouteMatch<{ number: string }>([
    "/profile/orders/:number",
    "/feed/:number",
  ])?.params?.number;

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(getIngredients());

    /* checkUserAuth вызывает проверку авторизирован ли пользователь - 
    отправляет запрос за данными пользователя, если токен есть в хранилище 
    Вызов этой проверки может быть либо при монтировании App или в ProtectedRoute  */
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:number" exact>
          <div className={styles.detailPageWrap}>
            <p
              className={`text text_type_digits-default ${styles.detailHeader}`}
            >
              #{orderNumber && orderNumber.padStart(6, "0")}
            </p>
            <OrderInfo />
          </div>
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/register" exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/login" exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <div className={styles.detailPageWrap}>
            <p className={`text text_type_main-large ${styles.detailHeader}`}>
              Детали ингредиента
            </p>
            <IngredientsDetails />
          </div>
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:number" exact>
          <div className={styles.detailPageWrap}>
            <p
              className={`text text_type_digits-default ${styles.detailHeader}`}
            >
              #{orderNumber && orderNumber.padStart(6, "0")}
            </p>
            <OrderInfo />
          </div>
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route>
          <div className={styles.detailPageWrap}>
            <NotFound404 />
          </div>
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:id" exact>
            <Modal onClose={handleModalClose} title="Детали ингредиента">
              <IngredientsDetails />
            </Modal>
          </Route>
          <ProtectedRoute path="/profile/orders/:number" exact>
            <Modal
              onClose={handleModalClose}
              title={`#${orderNumber && orderNumber.padStart(6, "0")}`}
            >
              <OrderInfo />
            </Modal>
          </ProtectedRoute>
          <Route path="/feed/:number" exact>
            <Modal
              onClose={handleModalClose}
              title={`#${orderNumber && orderNumber.padStart(6, "0")}`}
            >
              <OrderInfo />
            </Modal>
          </Route>
        </>
      )}
    </div>
  );
};

export default App;
