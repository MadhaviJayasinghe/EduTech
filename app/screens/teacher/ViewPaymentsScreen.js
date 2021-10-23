import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, PermissionsAndroid, Image } from "react-native";
import styles from './style';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import PageLayout from '@components/PageLayout';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ViewPaymentsScreen({ route }) {
  const [userToken, setUserToken] = useState(undefined)
  const [paymentsList, setPaymentsList] = useState([]);


  // useEffect(() => {
  //   () => console.log('l')
  //   // bootstrapAsync(),
  //   //   listStudents("");
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // bootstrapAsync(),
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
      .collection('payments')
      .where("teacherId", "==", userToken)
      .get();
      console.log(response.docs)

    setPaymentsList(response.docs); 
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.paymentCard}>
        <Image style ={styles.paymentImg} source={{uri:item._data.slip}}/>
        <Text style={styles.paymentText}>Student Id: {item._data.studentId}</Text>
        <Text style={styles.paymentText}>Grade: {item._data.grade}</Text>
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
      <PageLayout title='View Payments' />
      <View style={styles.pageContainer}>
        <View style={{ height: 20 }} />
        <FlatList
          style={styles.flatlist}
          data={paymentsList}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}