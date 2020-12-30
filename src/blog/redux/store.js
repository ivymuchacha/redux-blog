/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-unresolved */
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';

export default configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});
