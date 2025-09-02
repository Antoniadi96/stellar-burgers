import constructorReducer, {
  ConstructorState,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../constructorSlice';

describe('constructorSlice', () => {
  const bun1 = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    id: 'ruIU61CUJ29FwISlAO-cq'
  };

  const ingredient1 = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    id: '8VSfJ8lg4cadvY5RfP_7B'
  };

  const ingredient2 = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    id: '9gi6JPw0JRKL1MVgkeh56'
  };

  const ingredient3 = {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0,
    id: 'Y5MwcDMH2YojJknpxSPsw'
  };

  it('добавление булки', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      error: null,
      orderModalData: null,
      orderRequest: false
    };

    const updatedState = constructorReducer(initialState, addIngredient(bun1));

    expect(updatedState.constructorItems.bun).toEqual({
      ...bun1,
      id: expect.any(String)
    });
  });

  it('добавление начинки', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      isLoading: false,
      error: null,
      orderModalData: null,
      orderRequest: false
    };

    const updatedState = constructorReducer(
      initialState,
      addIngredient(ingredient1)
    );

    expect(updatedState.constructorItems.ingredients[0]).toEqual({
      ...ingredient1,
      id: expect.any(String)
    });
  });

  it('удаление начинки', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1]
      },
      isLoading: false,
      error: null,
      orderModalData: null,
      orderRequest: false
    };

    const updatedState = constructorReducer(
      initialState,
      removeIngredient(ingredient1.id)
    );

    expect(updatedState.constructorItems.ingredients.length).toEqual(0);
  });

  it('перемещение ингредиента вверх', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      },
      isLoading: false,
      error: null,
      orderModalData: null,
      orderRequest: false
    };

    const updatedState = constructorReducer(
      initialState,
      moveIngredientUp(ingredient2.id)
    );

    expect(updatedState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1,
      ingredient3
    ]);
  });

  it('перемещение ингредиента вверх', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [ingredient1, ingredient2, ingredient3]
      },
      isLoading: false,
      error: null,
      orderModalData: null,
      orderRequest: false
    };

    const updatedState = constructorReducer(
      initialState,
      moveIngredientDown(ingredient2.id)
    );

    expect(updatedState.constructorItems.ingredients).toEqual([
      ingredient1,
      ingredient3,
      ingredient2
    ]);
  });
});
