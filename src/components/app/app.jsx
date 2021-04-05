import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'

function App() {
  const ingredients = [
    { 
      name: 'Булки',
      items: [
        {
          img: '#',
          price: 20,
          text: 'Краторная булка N-200i',
          count: 1,
        },
        {
          img: '#',
          price: 20,
          text: 'Флюоресцентная булка R2-D3',
        }
      ]
    },
    { 
      name: 'Соусы',
      items: [
        {
          img: '#',
          price: 30,
          text: 'Соус Spicy-X',
        },
        {
          img: '#',
          price: 30,
          text: 'Соус фирменный Space Sauce',
        },
        {
          img: '#',
          price: 30,
          text: 'Соус Spicy-X',
          count: 1,
        },
        {
          img: '#',
          price: 30,
          text: 'Соус фирменный Space Sauce',
        }
      ]
    },
    { 
      name: 'Начинки',
      items: [
        {
          img: '#',
          price: 20,
          text: 'Краторная булка N-200i',
        },
        {
          img: '#',
          price: 20,
          text: 'Флюоресцентная булка R2-D3',
        }
      ]
    }
  ]

  const constructor = [
    {
      img: '#',
      text: 'Соус традиционный галактический',
      price: 20,
      isLocked: true,
    },
    {
      img: '#',
      text: 'Мясо бессмертных моллюсков Protostomia',
      price: 20,
      isLocked: true,
    },
    {
      img: '#',
      text: 'Плоды Фалленианского дерева',
      price: 20,
      isLocked: true,
    },
    {
      img: '#',
      text: 'Хрустящие минеральные кольца',
      price: 20,
      isLocked: true,
    },
    {
      img: '#',
      text: 'Хрустящие минеральные кольца',
      price: 20,
      isLocked: true,
    },
    {
      img: '#',
      text: 'Хрустящие минеральные кольца',
      price: 20,
      isLocked: true,
    }
  ]

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-5`}>Соберите бургер</h1>
      <main className={styles.main}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={constructor} />
      </main>
    </div>
  );
}

export default App;
