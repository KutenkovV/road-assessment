import { configureStore } from '@reduxjs/toolkit';
import UploadStore from '../store/UploadStore';
import mainStore from '../store/MainStore';


export default configureStore({
  reducer: {
    uploadStore: UploadStore,
    mainStore: mainStore
  },
});
