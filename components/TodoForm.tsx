// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import {NavigationActions} from 'react-navigation';
// import IndexScreen from '../screens/IndexScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ToDoForm = ({onSubmit, initialValues}) => {
//   // To get the value from the TextInput
//   const [title, setTitle] = useState(initialValues.title);

//   // To set the value on Text
//   const [getValue, setGetValue] = useState('');

//   const saveValueFunction = () => {
//     //function to save the value in AsyncStorage
//     if (title) {
//       //To check the input not empty
//       AsyncStorage.setItem('any_key_here', title);
//       //Setting a data to a AsyncStorage with respect to a key
//       setTitle('');
//       //Resetting the TextInput
//       alert('Data Saved');
//       //alert to confirm
//     } else {
//       alert('Please fill data');
//       //alert for the empty InputText
//     }
//   };

//   const getValueFunction = () => {
//     //function to get the value from AsyncStorage
//     AsyncStorage.getItem('any_key_here').then(
//       title =>
//         //AsyncStorage returns a promise so adding a callback to get the value
//         setGetValue(title),
//       //Setting the value in Text
//     );
//   };

//   // const getValueFunction = () => {
//   //   //function to get the value from AsyncStorage
//   //   AsyncStorage.getItem('any_key_here').then(
//   //     (data) =>
//   //       //AsyncStorage returns a promise so adding a callback to get the value
//   //       this.setState({data})
//   //     //Setting the value in Text
//   //   );
//   // };
//   return (
//     <View style={styles.label}>
//       <Text style={styles.label}>Enter New Todo:</Text>
//       <TextInput
//         style={styles.input}
//         value={title}
//         onChangeText={text => setTitle(text)}
//         // onChangeText={text => setTextInputValue(text)}
//       />
//       <Button
//         title="ADD & SAVE"
//         onPress={() => {
//           onSubmit(title);
//           saveValueFunction(title);
//         }}
//       />
//     </View>
//   );
// };

// ToDoForm.defaultProps = {
//   initialValues: {
//     title: '',
//   },
// };

// const styles = StyleSheet.create({
//   input: {
//     fontSize: 18,
//     borderWidth: 5,
//     borderColor: 'green',
//     marginBottom: 15,
//     padding: 5,
//     margin: 5,
//     color: 'red',
//   },
//   // inputBox: {
//   //   width: 200,
//   //   borderColor: 'purple',
//   //   borderRadius: 8,
//   //   borderWidth: 2,
//   //   paddingLeft: 8,
//   //   alignItems: 'center',
//   // },
//   label: {
//     fontSize: 25,
//     marginBottom: 5,
//     marginLeft: 5,
//     color: 'red',
//   },
//   icon: {
//     marginLeft: 50,
//   },
//   buttonStyle: {
//     fontSize: 16,
//     color: 'white',
//     backgroundColor: 'green',
//     padding: 5,
//     marginTop: 32,
//     minWidth: 250,
//   },
//   buttonTextStyle: {
//     padding: 5,
//     color: 'white',
//     textAlign: 'center',
//   },
//   textStyle: {
//     padding: 10,
//     textAlign: 'center',
//     color: 'black',
//   },
// });

// export default ToDoForm;
