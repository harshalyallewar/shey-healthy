import {configureStore} from '@reduxjs/toolkit';

import alertsSlice from './alertsSlice';
import userInfo from './userInfo';

export const Store = configureStore({
  reducer: {
    alerts : alertsSlice,
    user : userInfo
  },
});