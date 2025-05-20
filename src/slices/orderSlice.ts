import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TOrder } from '../utils/types';
import { getOrderByNumberApi } from '../utils/burger-api';


export interface orderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}

const initialState: orderState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrderThunk = createAsyncThunk(
  'order/get',
  (number: number) => getOrderByNumberApi(number)
);


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderStateSelector: (state) => state,
    getOrderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.orders[0];
      });
  }
});

export { initialState as ingredientsInitialState };
export const { getOrderStateSelector, getOrderSelector } = orderSlice.selectors;

export default orderSlice.reducer;
