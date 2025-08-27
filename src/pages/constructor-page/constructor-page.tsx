import { FC, useEffect } from 'react';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '@slices/ingredients';
import {
  selectIngredientsLoading,
  selectAllIngredients
} from '@selectors/ingredients';

export const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIngredientsLoading);
  const items = useAppSelector(selectAllIngredients);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
