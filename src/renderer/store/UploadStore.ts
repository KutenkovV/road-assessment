import { createSlice } from '@reduxjs/toolkit';

export const data = createSlice({
  name: 'data',
  initialState: {
    value: [], // Данные с оценкой
    valueAfter: [], // Сырые данные(до оценки)
    file: '', // Имя файла
    road_class: 'IA, IБ', // Класс дороги в выпадающем списке
    radio_type: 'true', // Тип дороги в радио-кнопках
  },
  reducers: {
    set_radio_type: (state, action) => {
      state.radio_type = action.payload;
    },
    selected_check: (state, action) => {
      state.road_class = action.payload;
    },
    dataload: (state, action) => {
      state.value = action.payload;
    },
    dataloadAfter: (state, action) => {
      state.valueAfter = action.payload;
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

export const { dataload, dataGet, setFile, fileGet, dataloadAfter, selected_check, set_radio_type} = data.actions;
export default data.reducer;
