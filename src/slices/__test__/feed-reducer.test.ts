import { describe, test, expect } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedSlice, { getFeedsThunk, getOrdersThunk } from '../feedsSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      feed: feedSlice
    }
  });

describe('Проверка экшенов из слайса ленты заказов', () => {
  describe('Асинхронный экшен получения общей ленты заказов', () => {
    test('Обработка pending-состояния', () => {
      const store = createTestStore();
      store.dispatch({ type: getFeedsThunk.pending.type });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(true);
      expect(feed.error).toBeNull();
    });

    test('Обработка fulfilled-состояния', () => {
      const fakeResponse = {
        orders: {
          _id: '660e7df397ede0001d0643df',
          ingredients: [
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2024-04-04T10:16:19.376Z',
          updatedAt: '2024-04-04T10:16:19.994Z',
          number: 37593
        },
        total: 37601,
        totalToday: 45
      };

      const store = createTestStore();
      store.dispatch({
        type: getFeedsThunk.fulfilled.type,
        payload: fakeResponse
      });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBeNull();
      expect(feed.orders).toEqual(fakeResponse.orders);
      expect(feed.total).toBe(fakeResponse.total);
      expect(feed.totalToday).toBe(fakeResponse.totalToday);
    });

    test('Обработка rejected-состояния', () => {
      const store = createTestStore();
      const mockErrorMessage = 'Ошибка загрузки';

      store.dispatch({
        type: getFeedsThunk.rejected.type,
        error: { message: mockErrorMessage }
      });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBe(mockErrorMessage);
    });
  });

  describe('Асинхронный экшен получения заказов пользователя (личный кабинет)', () => {
    test('fulfilled: успешное получение заказов', () => {
      const response = {
        _id: '660e7df397ede0001d0643df',
        ingredients: [
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Space флюоресцентный бургер',
        createdAt: '2024-04-04T10:16:19.376Z',
        updatedAt: '2024-04-04T10:16:19.994Z',
        number: 37593
      };

      const store = createTestStore();
      store.dispatch({
        type: getOrdersThunk.fulfilled.type,
        payload: response
      });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBeNull();
      expect(feed.orders).toEqual(response);
    });

    test('pending: начало загрузки заказов', () => {
      const store = createTestStore();
      store.dispatch({ type: getOrdersThunk.pending.type });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(true);
      expect(feed.error).toBeNull();
    });

    test('rejected: ошибка при загрузке', () => {
      const store = createTestStore();
      const errorMsg = 'Ошибка получения данных';

      store.dispatch({
        type: getOrdersThunk.rejected.type,
        error: { message: errorMsg }
      });

      const { feed } = store.getState();

      expect(feed.isLoading).toBe(false);
      expect(feed.error).toBe(errorMsg);
    });
  });
});
