import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    value: { 0: 0 }, // Данные с оценкой
    yearForecast: 0,
  },
  reducers: {
    set_progressBar: (state, action) => {
      state.value = action.payload;
    },
    set_yearForecast: (state, action) => {
        state.yearForecast = action.payload;
      },
  },
});

export const { set_progressBar, set_yearForecast } = mainStore.actions;
export default mainStore.reducer;
