import { Consumer } from '@/interface/consumer';
import {  RootState } from '@/lib/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

type PayloadType = {
  type: string;
  data: Consumer;
};


interface DataState {
  consumerData: PayloadType | null;
}

const initialState: DataState = {
  consumerData: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<PayloadType>) => {
      state.consumerData = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;
export const accountStateItem = (state: { data: DataState }) => state.data.consumerData;

export default dataSlice.reducer;

