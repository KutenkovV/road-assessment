import { configureStore } from '@reduxjs/toolkit';
import UploadStore from '../store/UploadStore';
import mainStore from '../store/MainStore';


export default configureStore({
  reducer: {
    data: UploadStore,
    mainStore: mainStore
  },
});
