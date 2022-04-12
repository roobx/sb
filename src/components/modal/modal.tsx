import React from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modals");

type TModalProps = {
  title: string;
  onClose: () => void;
};

const Modal: React.FC<TModalProps> = ({ title, onClose, children }) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={`${styles.title} text text_type_main-large`}>
            {title}
          </h3>
          <button className={styles.button} type="button" aria-label="закрыть">
            <CloseIcon type="primary" onClick={onClose} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
};

export default Modal;
