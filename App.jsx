//Imports

import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';


import { NavigationContainer } from "@react-navigation/native";
import { createNativeNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';

import AddTask from './src/screens/AddTask';
import AddTaskScreen from './src/screens/AddTask';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Stupify" component={HomeScreen}/>
        <Stack.Screen name="Add Task" component={AddTaskScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;