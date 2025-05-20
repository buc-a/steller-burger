import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export interface feedsState {
  isLoading: boolean;
  orders: TOrder[];
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: feedsState = {
  isLoading: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0
};

export const getFeedsThunk = createAsyncThunk(
  'orders/all',
  getFeedsApi
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsStateSelector: (state) => state,
    getFeedsSelector: (state) => state.orders,
    getFeedsTotalSelector: (state) => ({
      total: state.total,
      totalToday: state.totalToday,
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      });
  }
});

export { initialState as ingredientsInitialState };
export const { getFeedsStateSelector, getFeedsSelector, getFeedsTotalSelector } = feedsSlice.selectors;

export default feedsSlice.reducer;
