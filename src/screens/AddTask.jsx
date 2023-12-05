//IMPORTS
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text } from 'react-native';
//React Native Calendars package:  https://wix.github.io/react-native-calendars/docs/Intro
import { Agenda } from 'react-native-calendars';
//React Native Modal Datetime Picker: https://github.com/mmazzarolo/react-native-modal-datetime-picker
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
//React Native Paper: https://github.com/callstack/react-native-paper
import { Card } from 'react-native-paper';

export default function AgendaScreen({ navigation, route }) {
  const [items, setItems] = useState(route.params?.updatedItems || {});
  const [taskName, setTaskName] = useState('');
  //Set initial state to current date as string
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const addTask = () => {
    if (taskName.trim() !== '' && 
    selectedDate.trim() !== '' &&
    selectedStartTime.trim() !== '' &&
    selectedEndTime.trim() !== '') {

      const newTask = {
        name: taskName,
        date: selectedDate,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        height: Math.max(50, Math.floor(Math.random() * 150)),
      };

      const newItems = { ...items };

      if (!newItems[selectedDate]) {
        newItems[selectedDate] = [];
      }

      newItems[selectedDate].push(newTask);
      setItems(newItems);
      setTaskName('');
      setSelectedStartTime('');
      setSelectedEndTime('');


      navigation.navigate('Stupify', { updatedItems: newItems });
    } else {
      Alert.alert('Please enter task, select a date and set a time.');
    }
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false)
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
      <Text>Select a day</Text>
      <Agenda
        items={items}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        renderItem={(item, index) => (

          <Card style={styles.margin}>
            <Card.Content>
              <View style={[styles.item, styles.spacing]} key={index}>
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
        placeholder="Enter Task Description"
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


      <Button title="+" onPress={addTask} />
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
    borderRadius: 5
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  }
});
