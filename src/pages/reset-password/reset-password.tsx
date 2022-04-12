import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "../common.module.css";

import { resetPassword as resetPasswordApi } from "../../utils/burger-api";

const ResetPassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    /*
      Здесь допускается не использовать redux для
      выполнения запроса
    */
    setError(null);
    resetPasswordApi({ password, token })
      .then(() => {
        localStorage.removeItem("resetPassword");
        history.push("/login");
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem("resetPassword")) {
      history.replace("/forgot-password");
    }
  }, [history]);

  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className="pb-6 text text_type_main-medium">
          Восстановление пароля
        </h3>
        <form
          className={`pb-15 ${styles.form}`}
          name="login"
          onSubmit={handleSubmit}
        >
          <div className="pb-6">
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
          <div className="pb-6">
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={(e) => setToken(e.target.value)}
              value={token}
              name="token"
              error={false}
              errorText=""
              size="default"
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
          {error && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {error}
            </p>
          )}
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Вспомнили пароль?
          <Link to="/login" className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
