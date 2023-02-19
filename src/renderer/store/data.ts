import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

export const data = createSlice({
  name: 'data',
  initialState: {
    value: [],
  },
  reducers: {
    dataload: (state, action) => {
      state.value = action.payload;
    },
    dataGet: (state) => {
      return state;
    },
  },
});

export const { dataload, dataGet } = data.actions;
export default data.reducer;
