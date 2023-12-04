import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function AgendaScreen({ navigation, route }) {
  const [items, setItems] = useState(route.params?.updatedItems || {});
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const addTask = () => {
    if (taskName.trim() !== '' && selectedDate.trim() !== '') {
      const newTask = {
        name: taskName,
        height: Math.max(50, Math.floor(Math.random() * 150)),
      };

      const newItems = { ...items };

      if (!newItems[selectedDate]) {
        newItems[selectedDate] = [];
      }

      newItems[selectedDate].push(newTask);
      setItems(newItems);
      setTaskName('');

      navigation.navigate('Stupify!', { updatedItems: newItems });
    } else {
      Alert.alert('Please enter task and select a date');
    }
  };

  const removeTask = (date, index) => {
    const newItems = { ...items };
    newItems[date].splice(index, 1);
    if (newItems[date].length === 0) {
      delete newItems[date];
    }
    setItems(newItems);
    navigation.navigate('Stupify', { updatedItems: newItems });
  };

  return (
    <View style={styles.container}>
      <Text>Please select a day</Text>
      <Agenda
        items={items}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderItem={(item, index) => (
          <View style={styles.item} key={index}>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => removeTask(selectedDate, index)} />
          </View>
        )}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        showClosingKnob={true}
      />
      <TextInput
        placeholder="Enter task name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
