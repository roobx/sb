import { refreshToken } from "../../utils/burger-api";
import { RootState } from "../store";
import { Middleware } from "redux";

export type TwsActions = {
  wsInit: string;
  wsClose: string;
  wsSendMessage?: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

/* Мидлвара socketMiddleware должна быть универсальная, в ней не должны быть захардкожены
определенные экшены и адреса, они должны передаваться */
export const socketMiddleware = (
  wsActions: TwsActions
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit) {
        socket = new WebSocket(payload);
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: {
              data: parsedData,
              timestamp: new Date().getTime() / 100,
            },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(action);
    };
  };
};

/* пример реализации с реконнектом при обрыве соединения и обновлением токена*/
/* это в можно лучше */
const RECONNECT_PERIOD = 3000;

export const socketMiddlewareWithReconnect = (
  wsActions: TwsActions,
  withTockenRefresh = false
): Middleware<{}, RootState> => {
  return (store) => {
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsInit) {
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          /* В "можно лучше" - Обновление токена */
          if (
            withTockenRefresh &&
            parsedData.message === "Invalid or missing token"
          ) {
            refreshToken()
              .then((refreshData) => {
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  refreshData.accessToken.replace("Bearer ", "")
                );
                dispatch({
                  type: wsInit,
                  payload: wssUrl,
                });
              })
              .catch((err) => {
                dispatch({ type: onError, payload: err });
              });

            dispatch({ type: wsClose });

            return;
          }

          dispatch({
            type: onMessage,
            payload: {
              data: parsedData,
              timestamp: new Date().getTime() / 100,
            },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });

          /* В "можно лучше" - предусмотреть реконнект при обрыве связи */
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({
                type: wsInit,
                payload: url,
              });
            }, RECONNECT_PERIOD);
          }
        };
      }

      if (wsClose && type === wsClose && socket) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket.close();
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(action);
    };
  };
};
