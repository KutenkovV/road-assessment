import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/counterSlice';
import data from '../store/data';


export default configureStore({
  reducer: {
    counter: counterReducer,
    data: data,
  },
});
