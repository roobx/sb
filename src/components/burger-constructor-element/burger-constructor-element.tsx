import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor-element.module.css";

import { useDispatch } from "../../services/store";
import {
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_DELETE,
} from "../../services/actions/constructor";
import { TConstructorIngredient } from "../../utils/types";

type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
};

const BurgerConstructorElement: React.FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
}) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ["SORT_INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(
      item: {
        ingredient: TConstructorIngredient;
        index: number;
      },
      monitor
    ) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      if (!hoverBoundingRect || !clientOffset) return;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: CONSTRUCTOR_REORDER,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "SORT_INGREDIENT",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className={`${styles.element} mb-4 mr-2`}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <div className={`${styles.element_fullwidth} ml-2`}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() =>
            dispatch({
              type: CONSTRUCTOR_DELETE,
              payload: index,
            })
          }
        />
      </div>
    </li>
  );
};

export default React.memo(BurgerConstructorElement);
