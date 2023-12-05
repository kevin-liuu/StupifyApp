import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation, route }) {
  const [tasks, setTasks] = useState({});
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused && route.params?.updatedItems) {
      setTasks(route.params.updatedItems);
    }
  }, [isFocused, route.params?.updatedItems]);

  const removeTask = (date, index) => {
    const newTasks = { ...tasks };
    newTasks[date].splice(index, 1);
    if (newTasks[date].length === 0) {
      delete newTasks[date];
    }
    setTasks(newTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginBottom:15, 
      fontSize: 16,
      }}>My Task List:</Text>
      {Object.keys(tasks).map(date => (
        tasks[date].map((task, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>{date}: {task.name}</Text>
            <View>
              <Text>{task.startTime} - {task.endTime}</Text>
            </View>
            <TouchableOpacity onPress={() => removeTask(date, index)} style={styles.removeButton}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      ))}
      <Button
        title="Add Task"
        onPress={() => navigation.navigate('Add Task', { updatedItems: tasks })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskItem: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
});
