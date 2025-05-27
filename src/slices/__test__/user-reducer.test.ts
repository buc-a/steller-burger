import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  updateUserThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  getUserThunk
} from '../userSlice';
import { describe, test, expect } from '@jest/globals';

const createTestStore = () =>
  configureStore({
    reducer: {
      user: userSlice
    }
  });

describe('Проверка асинхронных действий пользователя', () => {
  const simulateError = 'Имитация ошибки';

  const testPending = (store: any, actionType: string) => {
    store.dispatch({ type: actionType });
    const { user } = store.getState();
    expect(user.isLoadong).toBe(true);
    expect(user.error).toBeNull();
  };

  const testRejected = (store: any, actionType: string) => {
    store.dispatch({
      type: actionType,
      error: { message: simulateError }
    });
    const { user } = store.getState();
    expect(user.isLoadong).toBe(false);
    expect(user.error).toBe(simulateError);
  };

  describe('Аутентификация', () => {
    test('Запрос логина — ожидание', () => {
      testPending(createTestStore(), loginUserThunk.pending.type);
    });

    test('Запрос логина — ошибка', () => {
      testRejected(createTestStore(), loginUserThunk.rejected.type);
    });

    test('Запрос логина — успех', () => {
      const userData = {
        accessToken: 'Bearer access_token',
        refreshToken: 'refresh_token',
        user: {
          email: 'user@example.com',
          name: 'Test User'
        }
      };
      const store = createTestStore();
      store.dispatch({ type: loginUserThunk.fulfilled.type, payload: userData });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toEqual(userData.user);
      expect(user.isAuthorized).toBe(true);
    });
  });

  describe('Регистрация', () => {
    test('Регистрация — ожидание', () => {
      testPending(createTestStore(), registerUserThunk.pending.type);
    });

    test('Регистрация — ошибка', () => {
      testRejected(createTestStore(), registerUserThunk.rejected.type);
    });

    test('Регистрация — успех', () => {
      const registeredUser = {
        accessToken: 'Bearer token',
        refreshToken: 'refresh_token',
        user: {
          email: 'new@example.com',
          name: 'New User'
        }
      };
      const store = createTestStore();
      store.dispatch({ type: registerUserThunk.fulfilled.type, payload: registeredUser });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toEqual(registeredUser.user);
      expect(user.isAuthorized).toBe(true);
    });
  });

  describe('Выход из аккаунта', () => {
    test('Выход — ожидание', () => {
      testPending(createTestStore(), logoutUserThunk.pending.type);
    });

    test('Выход — ошибка', () => {
      testRejected(createTestStore(), logoutUserThunk.rejected.type);
    });

    test('Выход — успех', () => {
      const store = createTestStore();
      store.dispatch({
        type: logoutUserThunk.fulfilled.type,
        payload: { message: 'Вы успешно вышли' }
      });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBe(false);
    });
  });

  describe('Обновление данных пользователя', () => {
    test('Обновление — ожидание', () => {
      testPending(createTestStore(), updateUserThunk.pending.type);
    });

    test('Обновление — ошибка', () => {
      testRejected(createTestStore(), updateUserThunk.rejected.type);
    });

    test('Обновление — успех', () => {
      const updatedData = {
        user: {
          email: 'update@example.com',
          name: 'Updated Name'
        }
      };
      const store = createTestStore();
      store.dispatch({
        type: updateUserThunk.fulfilled.type,
        payload: updatedData
      });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toEqual(updatedData.user);
      expect(user.isAuthorized).toBe(true);
    });
  });

  describe('Восстановление пароля', () => {
    test('Запрос восстановления — ожидание', () => {
      testPending(createTestStore(), forgotPasswordThunk.pending.type);
    });

    test('Запрос восстановления — ошибка', () => {
      testRejected(createTestStore(), forgotPasswordThunk.rejected.type);
    });

    test('Запрос восстановления — успех', () => {
      const store = createTestStore();
      store.dispatch({
        type: forgotPasswordThunk.fulfilled.type,
        payload: { message: 'Письмо отправлено' }
      });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBe(false);
    });
  });

  describe('Сброс пароля', () => {
    test('Сброс — ожидание', () => {
      testPending(createTestStore(), resetPasswordThunk.pending.type);
    });

    test('Сброс — ошибка', () => {
      testRejected(createTestStore(), resetPasswordThunk.rejected.type);
    });

    test('Сброс — успех', () => {
      const store = createTestStore();
      store.dispatch({
        type: resetPasswordThunk.fulfilled.type,
        payload: { message: 'Пароль сброшен' }
      });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toBeNull();
      expect(user.isAuthorized).toBe(false);
    });
  });

  describe('Получение текущего пользователя', () => {
    test('Получение — ожидание', () => {
      testPending(createTestStore(), getUserThunk.pending.type);
    });

    test('Получение — ошибка', () => {
      testRejected(createTestStore(), getUserThunk.rejected.type);
    });

    test('Получение — успех', () => {
      const currentUser = {
        user: {
          email: 'current@example.com',
          name: 'Current User'
        }
      };
      const store = createTestStore();
      store.dispatch({
        type: getUserThunk.fulfilled.type,
        payload: currentUser
      });

      const { user } = store.getState();
      expect(user.isLoadong).toBe(false);
      expect(user.error).toBeNull();
      expect(user.user).toEqual(currentUser.user);
      expect(user.isAuthorized).toBe(true);
    });
  });
});
