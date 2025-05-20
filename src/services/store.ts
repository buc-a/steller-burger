import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientReducer from '../slices/ingredientSlice';
import feedsReducer from '../slices/feedsSlice';
import orderReducer from '../slices/orderSlice';
import constructorReducer from '../slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  feeds: feedsReducer,
  order: orderReducer,
  constructordb: constructorReducer
}); 

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
