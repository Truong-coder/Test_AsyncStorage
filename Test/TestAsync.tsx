import React, {useState, useEffect} from 'react';
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
import Modal from 'react-native-modal';

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
const TestAsync = ({navigation}) => {
  useEffect(() => {
    getValueFunction();
  }, []);
  const startReload = () => RNRestart.Restart();
  const [newToDos, setNewToDos] = useState([]);
  console.log('initial newToDos', newToDos);

  //Add Modal visibility
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const handleModal = (): void => setIsModalVisible(() => !isModalVisible);

  // Delete Modal visiblity
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<Boolean>(false);
  const handleDeleteModal = (): void =>
    setIsDeleteModalVisible(() => !isDeleteModalVisible);

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
      {/* ADD BUTTON */}
      <Button
        title="ADD"
        onPress={() => {
          saveValueFunction();
          getValueFunction();
        }}
      />
      {/* DELETE ALL BUTTON */}
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
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.text}>
                {item.name} - {item.id}
              </Text>
              <View>
                {/* DELETE BUTTON */}
                <Button
                  style={styles.button}
                  title="DELETE"
                  onPress={() => {
                    handleDeleteModal();
                  }}
                />
                <Modal isVisible={isDeleteModalVisible}>
                  <View style={styles.ModalContainer}>
                    <Text style={styles.deleteText}>
                      Do you want to remove this todo?
                    </Text>
                    <Button
                      title="YES"
                      onPress={() => {
                        removeItem();
                        handleDeleteModal();
                      }}
                    />
                    <Button title="No" onPress={handleDeleteModal} />
                  </View>
                </Modal>
              </View>

              <View>
                {/* EDIT BUTTON */}
                <Button
                  title="EDIT"
                  onPress={() => navigation.navigate('Edit')}
                />
              </View>
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
    width: 200,
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    marginTop: 30,
    marginBottom: 15,
  },
  deleteText: {
    fontSize: 30,
    color: 'red',
  },
  ModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});

export default TestAsync;
