import { setCookie, getCookie } from "./cookie";
import { TIngredient, TOrder, TUser } from "./types";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const BURGER_API_WSS_ORDERS = "wss://norma.nomoreparties.space/orders";
export const BURGER_API_WSS_FEED = "wss://norma.nomoreparties.space/orders/all";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export const refreshToken = (): Promise<TRefreshResponse> => {
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      return refreshData;
    });
};

/* Это предпочтительны способ обновления токена, но допустимы и другие, главное,
что бы обновление токена работало корректно */
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
};

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export const orderBurger = (data: string[]) => {
  return fetchWithRefresh<TNewOrderResponse>(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data,
    }),
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
};

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export const getOrderByNumber = (number: number) => {
  return fetch(`${BURGER_API_URL}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => checkResponse<TOrderResponse>(res));
};

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUser = (data: TRegisterData) => {
  return fetch(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUser = (data: TLoginData) => {
  return fetch(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const forgotPassword = (data: { email: string }) => {
  return fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

export const resetPassword = (data: { password: string; token: string }) => {
  return fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
};

type TUserResponse = TServerResponse<{ user: TUser }>;

export const getUser = () => {
  return fetchWithRefresh<TUserResponse>(`${BURGER_API_URL}/auth/user`, {
    headers: {
      authorization: getCookie("accessToken"),
    } as HeadersInit,
  });
};

export const updateUser = (user: Partial<TRegisterData>) => {
  return fetchWithRefresh<TUserResponse>(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken"),
    } as HeadersInit,
    body: JSON.stringify(user),
  });
};

export const logout = () => {
  return fetch(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkResponse<TServerResponse<{}>>(res));
};
