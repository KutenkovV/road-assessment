import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    remont_list: [{
      item: [{ remont: [] }]
    }],
    data_remont: [],
    recommendation_data: [],
    data_list: [],
    data: [],
    marks_item: { 0: 0 },
    yearForecast: 0, // Кол-во лет на сколько делаем прогноз
    current_year: 0,
  },
  reducers: {
    set_remontList: (state, action) => {
      state.remont_list = action.payload;
    },
    set_dataRemont: (state, action) => {
      state.data_remont = action.payload;
    },
    set_currentYear: (state, action) => {
      state.current_year = action.payload;
    },
    set_progressBar: (state, action) => {
      state.marks_item = action.payload;
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

export const {
  set_progressBar,
  set_yearForecast,
  dataloadMain,
  dataMain,
  recommendationsLoad,
  set_currentYear,
  set_dataRemont,
  set_remontList
} = mainStore.actions;
export default mainStore.reducer;
