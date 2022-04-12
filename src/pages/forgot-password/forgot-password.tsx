import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "../common.module.css";

import { forgotPassword as forgotPasswordApi } from "../../utils/burger-api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const history = useHistory();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /*
      Здесь допускается не использовать redux для
      выполнения запроса
    */
    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem("resetPassword", "true");
        history.replace("/reset-password");
      })
      .catch((err) => setError(err));
  };

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
            <Input
              type="email"
              placeholder="Укажите e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              error={false}
              errorText=""
              size="default"
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Восстановить
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
          <Link to={"/login"} className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
