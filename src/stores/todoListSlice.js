import { createSlice } from '@reduxjs/toolkit';
import { todoStatus } from '../constant';

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    list: [
      {
        id: '1',
        status: todoStatus.DONE,
        body: 'Read Instructions',
      },
      {
        id: '2',
        status: todoStatus.ACTIVE,
        body: 'Think a bit',
      },
      {
        id: '3',
        status: todoStatus.ACTIVE,
        body: "Google 'How to build todo app",
      },
      {
        id: '4',
        status: todoStatus.DONE,
        body: 'Read results from Google',
      },
      {
        id: '5',
        status: todoStatus.DONE,
        body: "Google 'How to build todo app using React Native",
      },
      {
        id: '6',
        status: todoStatus.DONE,
        body: 'Read results from Google again',
      },
      {
        id: '7',
        status: todoStatus.DONE,
        body: 'Spend some more time thinking',
      },
      {
        id: '8',
        status: todoStatus.DONE,
        body: 'Use knowledge gained at CoderSchool to build new todo app',
      },
      {
        id: '9',
        status: todoStatus.DONE,
        body: 'Use knowledge gained at CoderSchool to build new todo app',
      },
      {
        id: '10',
        status: todoStatus.DONE,
        body: 'Use knowledge gained at CoderSchool to build new todo app',
      },
    ],
  },
  reducers: {
    addItem: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare(body) {
        return {
          payload: {
            id: new Date().getTime().toString(),
            status: todoStatus.ACTIVE,
            body: body,
          },
        };
      },
    },
    updateItem: {
      reducer: (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.itemId
        );
        state.list[index].status = action.payload.newStatus;
      },
      prepare(item) {
        return {
          payload: {
            itemId: item.id,
            newStatus:
              item.status === todoStatus.ACTIVE
                ? todoStatus.DONE
                : todoStatus.ACTIVE,
          },
        };
      },
    },
    removeItem: {
      reducer: (state, action) => {
        const index = state.list.findIndex(
          (item) => item.id === action.payload.itemId
        );
        state.list.splice(index, 1);
      },
      prepare(itemId) {
        return {
          payload: {
            itemId: itemId,
          },
        };
      },
    },
  },
});

export const { addItem, updateItem, removeItem } = todoListSlice.actions;

export default todoListSlice.reducer;
