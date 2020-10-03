import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { item, index } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{index + 1 + '. ' + item.status}</Text>
      <Text style={styles.bodyText}>{item.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
    textAlign: 'center',
  },
  bodyText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 40,
  },
});
