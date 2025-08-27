import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Params, useParams } from 'react-router-dom';
import { selectIngredientById } from '@/services/selectors/ingredients';
import { useAppSelector } from '@/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useAppSelector(selectIngredientById(id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
useAppSelector;
