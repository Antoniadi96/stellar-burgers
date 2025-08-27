import { FC } from 'react';
import { BurgerConstructorUI } from '@ui';
import type { TConstructorIngredient, TOrder } from '@utils-types';
import {
  selectBurgerPrice,
  selectConstutorItems,
  selectOrderRequest,
  selectOrderModalData
} from '@/services/selectors/constructor';
import { selectUserAuth } from '@/services/selectors/user';
import { useAppSelector, useAppDispatch } from '@/services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, createOrder } from '@/services/slices/constructorSlice';

const defaultConstructor = {
  bun: null as TConstructorIngredient | null,
  ingredients: [] as TConstructorIngredient[]
};

export const BurgerConstructor: FC = () => {
  const isAuth = useAppSelector(selectUserAuth);
  const constructorItems = useAppSelector(selectConstutorItems);
  const price = useAppSelector(selectBurgerPrice);
  const orderRequest = useAppSelector(selectOrderRequest);
  const orderModalData = useAppSelector(selectOrderModalData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (isAuth && constructorItems.bun) {
      dispatch(
        createOrder([
          constructorItems.bun._id,
          ...constructorItems.ingredients.map((i) => i._id),
          constructorItems.bun._id
        ])
      );
    } else if (!isAuth) {
      navigate('/login');
    } else if (!constructorItems.bun) {
      return;
    }
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      constructorItems={constructorItems}
      price={price}
      orderRequest={orderRequest}
      orderModalData={orderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={handleCloseOrderModal}
    />
  );
};
useAppSelector;
