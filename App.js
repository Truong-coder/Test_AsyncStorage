import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const App = () => {
  const [input, setInput] = useState('');
  let STORAGE_KEY = '@user_input';
  //saving the data
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, age);
      // eslint-disable-next-line no-alert
      alert('Data successfully saved');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to save the data to the storage');
    }
  };
  // Reading the data
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to fetch the input from storage');
    }
  };
  // To retrieve the data whenever the app starts,
  // invoke this method inside the useEffect hook.
  useEffect(() => {
    readData();
  }, []);
  // Clearing all storage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      // eslint-disable-next-line no-alert
      alert('Storage successfully cleared!');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to clear the async storage.');
    }
  };
  // Controlling the input
  //These methods are going to be responsible for
  // reading the input and updating the state variable as well as storing the input.
  const onChangeText = value => setInput(value);

  const onSubmitEditing = () => {
    if (!input) {
      return;
    }

    saveData(input);
    setInput('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.label}>Enter your input here:</Text>
        <TextInput
          style={styles.inputField}
          value={input}
          placeholder="Enter"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Text style={styles.text}>Your input is {input}</Text>
        <Pressable onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    paddingTop: 48,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    paddingTop: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    padding: 10,
    marginTop: 12,
    color: 'black'
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#444',
  },
});
export default App;
