import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, PermissionsAndroid } from "react-native";
import styles from './style';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import PageLayout from '@components/PageLayout';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ViewStudentsScreen({ route }) {
  const [userToken, setUserToken] = useState(undefined)
  const [studentList, setStudentList] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      listStudents("");
    }, [])
  );

  const bootstrapAsync = async () => {
    setUserToken(userToken)
  };

  async function downloadFile(url, name) {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: name,
            path: `${dirs.DownloadDir}/test.pdf`,
          },
        })
          .fetch('GET', url, {})
          .then((res) => {
            console.log('The file saved to ', res.path());
          })
          .catch((e) => {
            console.log(e)
          });
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const listStudents = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    const response = await firestore()
      .collection('registered_classes')
      .where("teacherId", "==", userToken)
      .where("grade", "==", route.params)
      .get();

    for (let userObject of response.docs) {
      const student = await firestore()
      .collection('students')
      .where("id", "==" ,userObject._data.studentId)
      .get();
      
      const studentName = student.docs[0]._data.firstName + " " + student.docs[0]._data.lastName
      setStudentList(c => c.concat(studentName));
    }    
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.cardLecture}>
        <Text
          // onPress={() => getItem(item.fullPath, item.name)}
        >
          {item}
        </Text>
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

  const getItem = async (fullPath, name) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
        console.error(e);
      });
    downloadFile(url, name)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='View Students' />
      <View style={styles.pageContainer}>
        <View style={{ height: 20 }} />
        <FlatList
          style={styles.flatlist}
          data={studentList}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}