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

// import { Context } from '../context/ToDoContext';
// import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
// import ToDoForm from '../components/ToDoForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

interface IToDo {
  title: string;
  id: number;
}

const IndexScreen = ({navigation}) => {
  useEffect(() => {
    getValueFunction();
  }, []);
  const startReload = () => RNRestart.Restart();
  const [newToDos, setNewToDos] = useState([]);
  console.log('initial newToDos', newToDos);
  const [value, setValue] = useState<string>('');

  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);
  //Add Modal visibility
  const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);
  const handleModal = (): void => setIsModalVisible(() => !isModalVisible);

  // Delete Modal visiblity
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<Boolean>(false);
  const handleDeleteModal = (): void =>
    setIsDeleteModalVisible(() => !isDeleteModalVisible);

  const handleSubmit = (): void => {
    if (value.trim()) {
      setToDoList([
        ...toDoList,
        {title: value, id: Math.floor(Math.random() * 99999)},
      ]);
    } else {
      showError(true);
    }
    setValue('');
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDoList(newToDoList);
  };

  const removeAllValueFunction = () => {
    AsyncStorage.removeItem('storedTodos');
    // AsyncStorage.setItem('storedTodos', JSON.stringify(newToDos));
    console.log('Empty List: ', newToDos);
  };

  const saveValueFunction = () => {
    //function to save the value in AsyncStorage
    AsyncStorage.setItem('storedTodos', JSON.stringify(toDoList));
    //Setting a data to a AsyncStorage with respect to a key
  };
  const getValueFunction = () => {
    console.log('BEGIN getValueFunction');
    //function to get the value from AsyncStorage
    // This allows you to batch the fetching of items given an array of key inputs.
    AsyncStorage.getItem('storedTodos').then(data1 => {
      if (data1 !== null) {
        setToDoList(JSON.parse(data1));
      }
      console.log('newTodos: ', toDoList);
    });
  };
  console.log('newTodo outside getValueFunction: ', toDoList);

  // const clearAsyncStorage = async () => {
  //   AsyncStorage.clear();
  // }
  return (
    <View>
      {/* <Button onPress={clearAsyncStorage}/> */}
      <View>
        <View>
          {/* ADD TODO */}
          <Button
            title="Add ToDo"
            onPress={() => {
              handleModal();
            }}
          />
          <Modal isVisible={isModalVisible}>
            <View style={styles.ModalContainer}>
              <TextInput
                placeholder="Enter your todo task..."
                placeholderTextColor="pink"
                value={value}
                onChangeText={e => {
                  setValue(e);
                  showError(false);
                }}
                style={styles.inputBox}
              />
              <Button
                title="ADD"
                onPress={() => {
                  handleSubmit();
                  saveValueFunction();
                  handleModal();
                }}
              />
              <Button title="Cancel" onPress={handleModal} />
            </View>
          </Modal>
          {/* DELETE ALL TODO */}
          <Button
            title="DELETE All"
            onPress={() => {
              removeAllValueFunction();
              startReload();
            }}
          />
        </View>
        {error && (
          <Text style={styles.error}>Error: Input field is empty...</Text>
        )}
        <Text style={styles.subtitle}>Your Tasks :</Text>
        {toDoList.length === 0 && (
          <Text style={styles.error}>!!! No Todo task to show !!!</Text>
        )}
        {/* {toDoList.map((toDo: IToDo, index: number) => (
          <View style={styles.listItem} key={`${index}_${toDo.title}`}>
            </View>
          </View>
        ))} */}
      </View>

      <View>
        <FlatList
          data={toDoList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.text}>
                {' '}
                {item.title} - {item.id}{' '}
              </Text>
              {/* DELETE BUTTON */}
              <View>
                <Button title="X" onPress={handleDeleteModal} color="crimson" />
                <Modal isVisible={isDeleteModalVisible}>
                  <View style={styles.ModalContainer}>
                    <Text style={styles.deleteText}>
                      Do you want to remove this todo?
                    </Text>
                    <Button
                      title="YES"
                      onPress={() => {
                        removeItem();
                        saveValueFunction(item.id);
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
  container: {
    padding: 35,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    color: 'black',
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'flex-end',
  },
  task: {
    width: 200,
  },
  error: {
    color: 'red',
  },
  text: {
    fontSize: 18,
    color: 'black',
    width: 200,
  },
  ModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 30,
  },
  deleteText: {
    fontSize: 30,
    color: 'red',
  },
});

export default IndexScreen;
