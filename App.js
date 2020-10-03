import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import FilterScreen from './src/screens/FilterScreen';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { todoStatus } from './src/constant';
import store from './src/stores';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='detail'
        options={{ title: 'Todo Detail' }}
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
}

function CompleteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='complete'
        options={{ title: 'Complete' }}
        component={FilterScreen}
        initialParams={{ filterStatus: todoStatus.DONE }}
      />
    </Stack.Navigator>
  );
}

function ActiveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        name='active'
        options={{ title: 'Active' }}
        component={FilterScreen}
        initialParams={{ filterStatus: todoStatus.ACTIVE }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='home_stack'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              switch (route.name) {
                case 'home_stack':
                  return (
                    <AntDesign name='pluscircleo' size={size} color={color} />
                  );

                case 'active':
                  return (
                    <Ionicons name='ios-options' size={size} color={color} />
                  );

                case 'complete':
                  return (
                    <MaterialCommunityIcons
                      name='check-all'
                      size={size}
                      color={color}
                    />
                  );
              }
            },
          })}
        >
          <Tab.Screen
            name='complete'
            options={{ title: 'Complete' }}
            component={CompleteStack}
          />
          <Tab.Screen
            name='home_stack'
            options={{ title: 'All' }}
            component={HomeStack}
          />
          <Tab.Screen
            name='active'
            options={{ title: 'Active' }}
            component={ActiveStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
