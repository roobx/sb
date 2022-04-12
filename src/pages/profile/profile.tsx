import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../../services/store";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile.module.css";
import commonStyles from "../common.module.css";

import ProfileMenu from "../../components/profile-menu/profile-menu";

import { getUser } from "../../services/actions/user";
import { updateUser } from "../../services/actions/user";
import { TUser } from "../../utils/types";

const Profile = () => {
  const dispatch = useDispatch();
  const { data, updateUserError } = useSelector((state) => state.user);
  const user = data as TUser;

  const [formValue, setFormValue] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
  });

  useEffect(() => {
    dispatch(getUser);
  }, [dispatch]);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || "",
      email: user?.email || "",
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    formValue.password;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue)).then(() => {
      if (!updateUserError) {
        setFormValue({
          name: user?.name,
          email: user?.email,
          password: "",
        });
      }
    });
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name,
      email: user?.email,
      password: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={handleSubmit}
      >
        <div className="pb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleInputChange}
            value={formValue.name}
            name={"name"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
          />
        </div>
        <div className="pb-6">
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={handleInputChange}
            value={formValue.email}
            name={"email"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
          />
        </div>
        <div className="pb-6">
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleInputChange}
            value={formValue.password}
            name={"password"}
            error={false}
            errorText={""}
            size={"default"}
            icon={"EditIcon"}
          />
        </div>
        {isFormChanged && (
          <div className={styles.button}>
            <Button
              type="secondary"
              htmlType="button"
              size="medium"
              onClick={handleCancel}
            >
              Отменить
            </Button>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
          </div>
        )}
        {updateUserError && (
          <p
            className={`${commonStyles.error} pt-5 text text_type_main-default`}
          >
            {updateUserError as string}
          </p>
        )}
      </form>
    </main>
  );
};

export default Profile;
