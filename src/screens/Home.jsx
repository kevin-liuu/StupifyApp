import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {
    StyleSheet,
    Pressable,
    View,
    Text,
    ScrollView,
    TextInput,
    Button
  } from 'react-native';


export default function HomeScreen({navigation}){

    return(
        
            <SafeAreaView>
                <Text>Task List</Text>
                <Button
                title="Add Task"
                onPress={() => navigation.navigate('Add Task')}/>
            </SafeAreaView>
    );
}