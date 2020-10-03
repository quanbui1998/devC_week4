import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import ToDoItem from './TodoItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, updateItem, removeItem } from '../stores/todoListSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const listTodos = useSelector((state) => state.todoList.list);
  const [todoInput, setTodoInput] = useState('');

  function onButtonSubmitClick() {
    if (todoInput !== null && todoInput.trim() !== '') {
      dispatch(addItem(todoInput.trim()));
      setTodoInput('');
    } else {
      Alert.alert(
        'Alert',
        'Please input todo!',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
    }
  }

  function onTodoItemClick(todoItem) {
    dispatch(updateItem(todoItem));
    navigation.push('detail', {
      item: todoItem,
      index: listTodos.indexOf(todoItem),
    });
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://mobimg.b-cdn.net/pic/v2/gallery/preview/fon-35948.jpg',
        }}
        style={styles.imgBg}
      >
        <ScrollView style={{ marginVertical: 10 }}>
          <View style={styles.listWrapper}>
            <Text style={styles.title}>Todo List ({listTodos.length})</Text>
            <FlatList
              data={listTodos}
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
          <TextInput
            style={styles.todoTextInput}
            onChangeText={(text) => setTodoInput(text)}
            value={todoInput}
          />
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={onButtonSubmitClick}
          >
            <Text style={styles.buttonSubmitLabel}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  imgBg: {
    height: '100%',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  listWrapper: {
    marginTop: 80,
    marginHorizontal: 50,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#00000090',
  },
  todoTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 20,
    color: 'white',
    paddingHorizontal: 10,
  },
  buttonSubmit: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderRadius: 8,
  },
  buttonSubmitLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
