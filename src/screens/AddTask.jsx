import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { Card } from 'react-native-paper';

export default function AgendaScreen() {
  const [items, setItems] = useState({});
  const [taskName, setTaskName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const addTask = () => {
    if (
      taskName.trim () !== '' &&
      selectedDate !== '' && 
      selectedStartTime !== '' && 
      selectedEndTime !== '') {
        const dateString = selectedDate;

        const newTask = {
          name: taskName,
          date: selectedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
          height: Math.max(50, Math.floor(Math.random() * 150)),
        };

        const newItems = { ...items };

        if (!newItems[dateString]) {
          newItems[dateString] = [];
        }

        newItems[dateString].push(newTask);
        setItems(newItems);
        setTaskName('');
        setSelectedStartTime('');
        setSelectedEndTime('');
     }
    else {
      Alert.alert('Please enter task, select date and set a time.');
    }
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (time) => {
    setSelectedStartTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (time) => {
    setSelectedEndTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    hideEndTimePicker();
  };

  return (
    <View style={styles.container}>
      <Text>Please select a day</Text>
      <Agenda
        items={items}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderItem={(item) => (
            <Card style={styles.margin}>
              <Card.Content>
                <View style={styles.spacing}>
                  <Text>{item.name}</Text>
                  <Text>{item.startTime} - {item.endTime}</Text>
                </View>
              </Card.Content>
            </Card>
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

      <View style={styles.timePickerContainer}>
        <View style={styles.timePicker}>
          <Button title="Select Start Time" onPress={showStartTimePicker} />
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={handleStartTimeConfirm}
            onCancel={hideStartTimePicker}
          />
          <Text>Start Time: {selectedStartTime}</Text>
        </View>
        <View style={styles.timePicker}>
          <Button title="Select End Time" onPress={showEndTimePicker} />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={handleEndTimeConfirm}
            onCancel={hideEndTimePicker}
          />
          <Text>End Time: {selectedEndTime}</Text>
        </View>
      </View>
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
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  timePicker: {
    alignItems: 'center',
  },
  spacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  margin: {
    marginRight: 15,
    marginTop: 17,
  },
});