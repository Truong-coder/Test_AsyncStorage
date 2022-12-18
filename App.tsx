import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import TestAsync from './Test/TestAsync';
import IndexScreen from './screens/IndexScreen';
import TestFlatList from './Test/TestFlatList';
import EditScreen from './screens/EditScreen';
import TestTextInput from './Test/TestTextInput';
import App1 from './Test/toDoTest';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    FlatList: TestFlatList,
    Async: TestAsync,
    Edit: EditScreen,
    Async2: TestTextInput,
    App1: App1,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'ToDo App',
    },
  },
);
const App = createAppContainer(navigator);
export default () => {
  return <App />;
};
