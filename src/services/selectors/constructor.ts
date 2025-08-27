import { RootState } from '../root-reducer';

export const selectConstutorItems = (s: RootState) =>
  s.burgerConstructor.constructorItems;

export const selectBurgerPrice = (s: RootState) => {
  const { bun, ingredients } = s.burgerConstructor.constructorItems;

  return (
    (bun?.price || 0) + ingredients.reduce((acc, item) => acc + item.price, 0)
  );
};

export const selectOrderRequest = (s: RootState) =>
  s.burgerConstructor.orderRequest;

export const selectOrderModalData = (s: RootState) =>
  s.burgerConstructor.orderModalData;
