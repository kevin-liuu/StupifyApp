
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function AgendaScreen() {
  const [items, setItems] = useState({});
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const addTask = () => {
    if (taskName.trim() !== '' && selectedDate.trim() !== '') {
      const dateString = selectedDate;

      const newTask = {
        name: taskName,
        height: Math.max(50, Math.floor(Math.random() * 150)),
      };

      const newItems = { ...items };

      if (!newItems[dateString]) {
        newItems[dateString] = [];
      }

      newItems[dateString].push(newTask);
      setItems(newItems);
      setTaskName('');
    } else {
      Alert.alert('Please enter task and select a date');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Please select a day</Text>
      <Agenda
        items={items}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderItem={(item) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
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
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  }
});


