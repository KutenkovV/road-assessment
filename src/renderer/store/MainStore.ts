import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    data_list: [],
    value: { 0: 0 }, // Данные с оценкой
    yearForecast: 0, // Кол-во лет на сколько делаем прогноз
  },
  reducers: {
    set_progressBar: (state, action) => {
      state.value = action.payload;
    },
    set_yearForecast: (state, action) => {
      state.yearForecast = action.payload;
    },
    dataloadMain: (state, action) => {
      state.data_list = action.payload;
    },
  },
});

export const { set_progressBar, set_yearForecast, dataloadMain } = mainStore.actions;
export default mainStore.reducer;
