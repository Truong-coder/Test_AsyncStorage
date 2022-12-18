import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

interface IToDo {
  name: string;
  id: number;
}

const Todos = [
  {
    id: 1,
    name: 'One',
  },
  {
    id: 2,
    name: 'Two',
  },
  {
    id: 3,
    name: 'Three',
  },
];
const TestTextInput = ({ navigation }) => {
  useEffect(() => {
    getValueFunction();
  }, []);
  const startReload = () => RNRestart.Restart();
  const [newToDos, setNewToDos] = useState([]);
  console.log('initial newToDos', newToDos);

  const saveValueFunction = () => {
    //function to save the value in AsyncStorage
    AsyncStorage.setItem('storedTodos', JSON.stringify(Todos));
    //Setting a data to a AsyncStorage with respect to a key
  };
  const getValueFunction = () => {
    console.log('BEGIN getValueFunction');
    //function to get the value from AsyncStorage
    // This allows you to batch the fetching of items given an array of key inputs.
    AsyncStorage.getItem('storedTodos').then(data1 => {
      if (data1 !== null) {
        setNewToDos(JSON.parse(data1));
      }
      console.log('newTodos: ', newToDos);
    });
  };
  console.log('newTodos outside getValueFunction: ', newToDos);

  const removeAllValueFunction = () => {
    AsyncStorage.removeItem('storedTodos');
    // AsyncStorage.setItem('storedTodos', JSON.stringify(newToDos));
    console.log('Empty List: ', newToDos);
  };

  const removeItem = (index: number): void => {
    AsyncStorage.getItem('storedTodos');
    const newToDoList = [...newToDos];
    newToDoList.splice(index, 1); //The splice() method adds and/or removes array elements. The splice() method overwrites the original array.
    setNewToDos(newToDoList);
    AsyncStorage.setItem('storedTodos', JSON.stringify(newToDoList));
    AsyncStorage.getItem('storedTodos').then(data1 => {
      if (data1 !== null) {
        setNewToDos(JSON.parse(data1));
      }
      console.log('newTodosList: ', newToDoList);
    });
  };
  console.log('newTodoList outside removeItem: ', newToDos);

  return (
    <View>
      <Button
        title="CREATE"
        onPress={() => {
          saveValueFunction();
          getValueFunction();
        }}
      />
      <Button
        title="DELETE All"
        onPress={() => {
          removeAllValueFunction();
          startReload();
        }}
      />
      <Button title="Reload" onPress={startReload} />
      <View>
        <FlatList
          data={newToDos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.text}>
                {item.name} - {item.id}
              </Text>
              <Button
                style={styles.button}
                title="DELETE"
                onPress={() => {
                  removeItem();
                }}
              />
              <Button
                title="EDIT"
                onPress={() => navigation.navigate('Edit')}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    width: '40%',
    height: 45,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 6,
    alignSelf: 'center',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestTextInput;
