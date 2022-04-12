import { useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

import styles from "../common.module.css";

import { useDispatch, useSelector } from "../../services/store";
import { registerUser } from "../../services/actions/user";

const Register = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => state.user.registerUserError);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(email, userName, password));
  };

  /*
    Отображение ошибок и валидация форм в "можно лучше"
  */
  return (
    <main className={styles.container}>
      <div className={`pt-6 ${styles.wrapCenter}`}>
        <h3 className="pb-6 text text_type_main-medium">Регистрация</h3>
        <form
          className={`pb-15 ${styles.form}`}
          name="register"
          onSubmit={handleSubmit}
        >
          <div className="pb-6">
            <Input
              type="text"
              placeholder="Имя"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              name="name"
              error={false}
              errorText=""
              size="default"
            />
          </div>
          <div className="pb-6">
            <Input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name={"email"}
              error={false}
              errorText=""
              size={"default"}
            />
          </div>
          <div className="pb-6">
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
          <div className={`pb-6 ${styles.button}`}>
            <Button type="primary" size="medium" htmlType="submit">
              Зарегистрироваться
            </Button>
          </div>
          {error && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {error as string}
            </p>
          )}
        </form>
        <div className={`${styles.question} text text_type_main-default pb-6`}>
          Уже зарегистрированы?
          <Link to="/login" className={`pl-2 ${styles.link}`}>
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
