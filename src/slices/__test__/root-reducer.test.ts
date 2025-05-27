import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../../services/store';
import { initialState as feedInitialState } from '../feedsSlice';
import { initialState as constructorInitialState} from '../constructorSlice';
import {ingredientsInitialState} from '../ingredientSlice';
import {initialState as orderInitialState} from '../orderSlice';
import {userInitialState} from '../userSlice';

describe('Тест корневого редьюсера', () => {
  const initialState = {
    user: { ...userInitialState },
    feeds: { ...feedInitialState },
    order: { ...orderInitialState },
    ingredients: { ...ingredientsInitialState },
    constructordb: { ...constructorInitialState }
  };
  test('Тест инициализации корневого редьюсера', () => {
    const action = { type: 'UNKNOW_ACTION' };
    const newState = rootReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });
});