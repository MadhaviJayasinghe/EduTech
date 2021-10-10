import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageLayout from '@components/PageLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

export default function StudentHandleScreen({ navigation }) {
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
      .where("teacherId", "==", userToken)
      .get();
    setRequestList(response.docs)
    console.log(response.docs)

  };


  const ItemView = ({ item }) => {
    return (
<View>
      <TouchableOpacity style={styles.requestCard}
        onPress={() => { navigation.navigate('ViewStudents') }}>
        <Text>Student : {item._data.studentName}</Text>
        <Text>Grade    : {item._data.grade}</Text>
      </TouchableOpacity>
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
      <PageLayout title='Join Requests' />
      <View style={styles.pageContainer}>
        {/* <View style={styles.margin} /> */}
        {/* <View style={styles.materialOption}> */}
          <FlatList
            style={styles.flatlist}
            data={requestList}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
          />
        {/* </View> */}
      </View>
    </SafeAreaView>
  )
}