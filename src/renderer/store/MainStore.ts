import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    value: { 0: "0" }, // Данные с оценкой
  },
  reducers: {
    set_progressBar: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set_progressBar } = mainStore.actions;
export default mainStore.reducer;
