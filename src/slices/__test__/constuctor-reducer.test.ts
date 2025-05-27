import { expect, test, describe } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  constructorInitialState,
  setOrderRequest,
  setNullOrderModalData
} from '../constructorSlice';
import type { constructorState } from '../constructorSlice';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockedID')
}));

describe('Reducer: Конструктор бургера', () => {
  const initialState: constructorState = JSON.parse(JSON.stringify(constructorInitialState));

  initialState.constructorItems = {
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '0'
    },
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: '1'
      },
      {
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
        id: '2'
      }
    ]
  };
  //экшен добавления ингредиента

  test('Добавление ингредиента', () => {
    const newIngredient = {
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
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
    };

    const expectedState = JSON.parse(JSON.stringify(initialState));
    expectedState.constructorItems.ingredients.push({ ...newIngredient, id: 'mockedID' });

    const result = constructorReducer(initialState, addIngredient(newIngredient));

    expect(nanoid).toHaveBeenCalled();
    expect(result).toEqual(expectedState);
  });

  //экшен удаления ингредиента
  test('Удаление ингредиента', () => {
    const idToRemove = '1';

    const expectedState = JSON.parse(JSON.stringify(initialState));
    expectedState.constructorItems.ingredients = expectedState.constructorItems.ingredients.filter(
      (item: TConstructorIngredient) => item.id !== idToRemove
    );

    const result = constructorReducer(initialState, removeIngredient(idToRemove));

    expect(result).toEqual(expectedState);
  });

  test('Установления состояния ', () => {
    const stateNew = true;

    const expectedState = JSON.parse(JSON.stringify(initialState));
    expectedState.orderRequest = stateNew;
    const result = constructorReducer(initialState, setOrderRequest(stateNew));

    expect(result).toEqual(expectedState);
  });

  test('Очистка данных ', () => {
    const expectedState = JSON.parse(JSON.stringify(initialState));
    expectedState.orderModalData = null;
    const result = constructorReducer(initialState, setNullOrderModalData());

    expect(result).toEqual(expectedState);
  });

  

  //экшен перемещения ингредиентов

  describe('Перемещение ингредиентов', () => {
    test('Перемещение вверх', () => {
      const index = 1;

      const expectedState = JSON.parse(JSON.stringify(initialState));
      const temp = expectedState.constructorItems.ingredients[index];
      expectedState.constructorItems.ingredients[index] = expectedState.constructorItems.ingredients[index - 1];
      expectedState.constructorItems.ingredients[index - 1] = temp;

      const result = constructorReducer(initialState, moveIngredientUp(index));

      expect(result).toEqual(expectedState);
    });

    test('Перемещение вниз', () => {
      const index = 0;

      const expectedState = JSON.parse(JSON.stringify(initialState));
      const temp = expectedState.constructorItems.ingredients[index];
      expectedState.constructorItems.ingredients[index] = expectedState.constructorItems.ingredients[index + 1];
      expectedState.constructorItems.ingredients[index + 1] = temp;

      const result = constructorReducer(initialState, moveIngredientDown(index));

      expect(result).toEqual(expectedState);
    });
  });
});
