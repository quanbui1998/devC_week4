import React from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem, removeItem } from '../stores/todoListSlice';

import ToDoItem from './TodoItem';

export default function FilterScreen({ navigation, route }) {
  const { filterStatus } = route.params || {};
  const dispatch = useDispatch();
  const listTodoActives = useSelector((state) =>
    state.todoList.list.filter((item) => item.status === filterStatus)
  );
  function onTodoItemClick(todoItem) {
    dispatch(updateItem(todoItem));
  }

  function onTodoItemLongClick(todoItem) {
    Alert.alert(
      'Confirm',
      'Do you want to delete?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(removeItem(todoItem.id));
          },
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listTodoActives}
        renderItem={({ item, index }) =>
          ToDoItem({
            index,
            item,
            onTodoItemClick,
            onTodoItemLongClick,
          })
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
