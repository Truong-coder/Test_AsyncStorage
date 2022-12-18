import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button } from 'react-native';
// import { Context } from '../context/ToDoContext';
// import ToDoForm from '../components/ToDoForm';

const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
//   const { state, editToDo } = useContext(Context);

//   const toDo = state.find((toDo: { id: any; }) => toDo.id === navigation.getParam('id'));

//   const [title, setTitle] = useState(toDo.title);
  return (
    <View>
      {/* <ToDoForm
        initialValues={{ title: toDo.title }}
        onSubmit={(title: any) => {
          editToDo(id, title, () => navigation.pop());
        }}
      /> */}
      <Button title="Cancel" onPress={() => navigation.navigate('Index')} />

    </View>
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
