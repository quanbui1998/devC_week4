import { configureStore } from '@reduxjs/toolkit';
import todoListSlice from './todoListSlice';

export default configureStore({
  reducer: {
    todoList: todoListSlice,
  },
});
