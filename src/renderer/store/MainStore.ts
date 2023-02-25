import { createSlice } from '@reduxjs/toolkit';

export const mainStore = createSlice({
  name: 'mainStore',
  initialState: {
    value: [], // Данные с оценкой
  },
  reducers: {
    setter: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const {  } = mainStore.actions;
export default mainStore.reducer;
