import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

export const data = createSlice({
  name: 'data',
  initialState: {
    value: [],
    file: '',
  },
  reducers: {
    dataload: (state, action) => {
      state.value = action.payload;
    },
    dataGet: (state) => {
      return state;
    },
    setFile: (state, action) => {
        state.file = action.payload;
    },
    fileGet: (state) => {
        return state
    }
  },
});

export const { dataload, dataGet, setFile, fileGet } = data.actions;
export default data.reducer;
