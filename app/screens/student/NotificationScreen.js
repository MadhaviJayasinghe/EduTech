import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageLayout from '@components/PageLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

export default function NotificationScreen() {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState("grade");
  const [requestList, setRequestList] = useState([])

  useEffect(() => {
    listRequests("");
  }, []);

  const listRequests = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await firestore()
      .collection('requests')
      .where("studentId", "==", userToken)
      .get();
    setRequestList(response.docs)
    console.log(response.docs)

  };


  const ItemView = ({ item }) => {
    return (
      <View style={styles.requestCard}>
        <Text>Student                : {item._data.studentName}</Text>
        <Text>Grade                   : {item._data.grade}</Text>
        <Text>Request Status  : {item._data.status}</Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Notifications' />
      <View style={styles.pageContainer}>
        <FlatList
          style={styles.flatlist}
          data={requestList}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}