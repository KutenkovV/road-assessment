import { configureStore } from '@reduxjs/toolkit';
import UploadStore from '../store/UploadStore';


export default configureStore({
  reducer: {
    data: UploadStore,
  },
});
