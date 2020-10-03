import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { todoStatus } from '../constant';

export default function ToDoItem({
  item,
  index,
  onTodoItemClick,
  onTodoItemLongClick,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: item.status === todoStatus.ACTIVE ? 'green' : 'blue',
        },
      ]}
      onPress={() => {
        onTodoItemClick(item);
      }}
      onLongPress={() => {
        onTodoItemLongClick(item);
      }}
    >
      <Text style={styles.label}>{index + 1 + ': ' + item.body}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
