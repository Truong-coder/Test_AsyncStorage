import React, { useState, useEffect } from 'react';

import { View, StyleSheet, FlatList, Text, Button } from 'react-native';

export default function TestFlatList() {
  const [Data, setData] = useState([]);

  const Items_1 = [
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

  const Items_2 = [
    {
      id: 4,
      name: 'Four',
    },
    {
      id: 5,
      name: 'Five',
    },
    {
      id: 6,
      name: 'Six',
    },
  ];

  useEffect(() => {
    setData(Items_1);
  }, []);

  const re_Render_FlatList = () => {
    setData(Items_2);
  };

  const Render_Item = ({ name }) => (
    <View>
      <Text style={styleSheet.itemsText}>{name}</Text>
    </View>
  );

  return (
    <View style={styleSheet.MainContainer}>
      <Button
        title='Click Here to Re-Render FlatList'
        onPress={re_Render_FlatList}
      />
      <FlatList
        data={Data}
        renderItem={({ item }) => <Render_Item name={item.name} />}
        keyExtractor={item => item.id}
        extraData={Data}
      />
    </View>
  );
}

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  itemsText: {
    fontSize: 24,
    color: 'black',
    paddingLeft: 10,
  },

  buttonText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});
