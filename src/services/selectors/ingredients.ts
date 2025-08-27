import type { RootState } from '../root-reducer';
import type { TIngredient } from '@utils-types';

export const selectIngredientsLoading = (s: RootState) =>
  s.ingredients.isLoading;

export const selectAllIngredients = (s: RootState): TIngredient[] =>
  s.ingredients.items;

export const selectIngredientById = (id: string) => (s: RootState) =>
  s.ingredients.items.find((i: TIngredient) => i._id === id);

export const selectBuns = (s: RootState): TIngredient[] =>
  s.ingredients.items.filter((i: TIngredient) => i.type === 'bun');

export const selectMains = (s: RootState): TIngredient[] =>
  s.ingredients.items.filter((i: TIngredient) => i.type === 'main');

export const selectSauces = (s: RootState): TIngredient[] =>
  s.ingredients.items.filter((i: TIngredient) => i.type === 'sauce');
