import { createSlice } from '@reduxjs/toolkit';

export const data = createSlice({
  name: 'data',
  initialState: {
    value: [], // Данные с оценкой
    valueRAW: [], // Сырые данные (до оценки)
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
    dataloadRAW: (state, action) => {
      state.valueRAW = action.payload;
    },
    // убрать
    dataGet: (state) => {
      return state;
    },
    // Задаем файл в хранилище
    setFile: (state, action) => {
        state.file = action.payload;
    },
    // убрать
    fileGet: (state) => {
        return state
    }
  },
});

export const { dataload, dataGet, setFile, fileGet, dataloadRAW, selected_check, set_radio_type} = data.actions;
export default data.reducer;
