import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    recommendation_data: [],
    data_list: [],
    data: [],
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
      state.data = action.payload[0].items;
    },
    recommendationsLoad: (state, action) => {
      state.recommendation_data = action.payload;
    },
    dataMain: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { set_progressBar, set_yearForecast, dataloadMain, dataMain, recommendationsLoad } = mainStore.actions;
export default mainStore.reducer;
