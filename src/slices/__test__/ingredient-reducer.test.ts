import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, { getIngredientsThunk } from '../ingredientSlice';

const createMockStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSlice
    }
  });

describe('Проверка асинхронных экшенов слайса ингредиентов', () => {
  describe('Получение ингредиентов с сервера', () => {
    test('pending: запрос отправлен, ожидание данных', () => {
      const store = createMockStore();

      store.dispatch({ type: getIngredientsThunk.pending.type });

      const { ingredients } = store.getState();

      expect(ingredients.isLoading).toBe(true);
      expect(ingredients.error).toBeNull();
    });

    test('fulfilled: успешная загрузка данных', () => {
      const fakeIngredient = {
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
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      };

      const store = createMockStore();

      store.dispatch({
        type: getIngredientsThunk.fulfilled.type,
        payload: fakeIngredient
      });

      const { ingredients } = store.getState();

      expect(ingredients.isLoading).toBe(false);
      expect(ingredients.error).toBeNull();
      expect(ingredients.ingredients).toEqual(fakeIngredient);
    });

    test('rejected: произошла ошибка при получении', () => {
      const store = createMockStore();
      const simulatedError = 'Ошибка загрузки ингредиентов';

      store.dispatch({
        type: getIngredientsThunk.rejected.type,
        error: { message: simulatedError }
      });

      const { ingredients } = store.getState();

      expect(ingredients.isLoading).toBe(false);
      expect(ingredients.error).toBe(simulatedError);
    });
  });
});
