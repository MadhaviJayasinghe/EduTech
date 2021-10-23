import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageLayout from '@components/PageLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from '@res/colors';

export default function StudentHandleScreen({ navigation }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState("grade");
  const [requestList, setRequestList] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('');
  const [userToken, setUserToken] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  useEffect(() => {
    listRequests("");
  }, []);

  const listRequests = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken)
    const response = await firestore()
      .collection('requests')
      .where("teacherId", "==", userToken)
      .get();
    setRequestList(response.docs)
  };

  cancelRequest = async () => {
    setShowAlert(false)
    const response = await firestore()
      .collection('requests')
      .where("studentId", "==", requestId)
      .get();

    firestore().collection("requests").doc(response.docs[0].id).update({ status: "Rejected" });
    navigation.navigate('TeacherHome')
  }

  approveRequest = async () => {
    setShowAlert(false)
    const response = await firestore()
      .collection('requests')
      .where("studentId", "==", requestId)
      .get();

    firestore().collection("requests").doc(response.docs[0].id).update({ status: "Approved" });

    const teacherResponse = await firestore()
      .collection('teachers')
      .doc(userToken)
      .get();

    console.log(teacherResponse)
    const newResponse = await firestore()
      .collection('registered_claases')
      .add({
        grade: studentGrade,
        studentId: requestId,
        subject: userToken,
        teacherId: teacherResponse._data.subject
      }).then((res) => {
        navigation.navigate('TeacherHome')
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  const ItemView = ({ item }) => {
    return (
      <View>
        <TouchableOpacity style={styles.requestCard}
          onPress={() => {
            setShowAlert(true),
              setRequestId(item._data.studentId),
              setStudentGrade(item._data.grade),
              setRequestStatus(item._data.status)
          }}>
          <Text>Student : {item._data.studentName}</Text>
          <Text>Grade    : {item._data.grade}</Text>
          {item._data.status == 'SENT' &&
            <Text>Status   : PENDING</Text>
          }
          {item._data.status != 'SENT' &&
            <Text>Status   : {item._data.status}</Text>
          }
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
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Approve Request"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, Cancel Request"
          confirmText="Yes, Add Student"
          confirmButtonColor={colors.primary_blue}
          cancelButtonColor={colors.primary_blue}
          onCancelPressed={() => {
            cancelRequest()
          }}
          onConfirmPressed={() => {
            approveRequest();
          }}
        />
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