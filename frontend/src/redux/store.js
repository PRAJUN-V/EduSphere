import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './user'

const store = configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
  });
  
  export default store;

