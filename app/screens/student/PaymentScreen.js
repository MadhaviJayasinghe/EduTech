import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Platform, Image, PermissionsAndroid } from 'react-native';
import styles from './style';
import storage from '@react-native-firebase/storage';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '@res/colors';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NetworkConsumer, NetworkProvider } from 'react-native-offline';

export default function PaymentScreen({ navigation }) {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [teacher, setTeacher] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [grade, setGrade] = useState("grade");
  const [grades, setGrades] = useState([]);
  const [teacherId, setTeacherId] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, [])

  getFileName = (path) => {
    if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
    }
    var imageName = path.split("/").pop()
    setImageName(imageName)
  }

  requestCameraPermission = async () => {
    try {
      setShowAlert(false)
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        captureUsingCamera()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  captureUsingCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log(image.path)
      var Image_Http_URL = image.path;
      setImageUrl(Image_Http_URL)
      getFileName(Image_Http_URL)
    });
  }

  selectImage = () => {
    setShowAlert(false)
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      console.log(image.path)
      var Image_Http_URL = image.path;
      setImageUrl(Image_Http_URL)
      getFileName(Image_Http_URL)
    })
  }

  uploadImageToStorage = (path) => {
    let reference = storage().ref('payments/' + imageName);
    let task = reference.putFile(path);
    task.then(() => {
      sendPayslip()
      console.log('Image uploaded to the bucket!');
    }).catch((e) => {
      console.log('uploading image error => ', e);
    });
  }

  uploadImageToCache = async (path) => {
    const iName = path.split('/').pop();
    console.log('Filename is ', iName)
    const imagePath = `${RNFS.ExternalCachesDirectoryPath}/${iName}`;

    RNFS.copyFile(path, imagePath)
      .then((success) => {
        console.log('IMG COPIED!');
        console.log(success);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const fileName = 'file://' + imagePath;
    await AsyncStorage.setItem('paidTeacher', teacherId);
    await AsyncStorage.setItem('paidGrade', grade);
    await AsyncStorage.setItem('payslip', fileName);
  }

  const fetchTeachers = async () => {
    const response = firestore().collection('teachers');
    const data = await response.get();
    setTeachers(data.docs)
  }

  const fetchGrades = async (tId) => {
    const response = await firestore()
      .collection('classes')
      .where("teacherId", "==", tId)
      .get();
    setGrades(response.docs)
  }

  ListAllGrades = () => {
    return (grades.map((x, i) => {
      var grade = 'Grade ' + x._data.grade
      return (<Picker.Item label={grade} key={i} value={x._data.grade} />)
    }
    ))
  }

  ListAllTeachers = () => {
    return (teachers.map((x, i) => {
      var name = x._data.firstName + " " + x._data.lastName
      return (<Picker.Item label={name} key={i} value={x.id} />)
    }
    ))
  }

  sendPayslip = async () => {
    const url = await storage().ref('payments/' + imageName).getDownloadURL()
    const response = await firestore()
      .collection('payments')
      .add({
        teacherId: teacherId,
        grade: grade,
        studentId: '123456',
        slip: url
      }).then((res) => {
        console.warn(res)
        console.log(response)
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Upload Payslip' />
      <View style={styles.pageContainer}>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={teacher}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(name) => { setTeacher(name), setTeacherId(name), fetchGrades(name) }} >
            <Picker.Item label="Teacher" value="Teacher" color='#808080' />
            {ListAllTeachers()}
          </Picker>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={grade}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(grade) => setGrade(grade)} >
            <Picker.Item label="Grade" value="Grade" color='#808080' />
            {ListAllGrades()}
          </Picker>
        </View>
        <View style={styles.card}>
          {imageUrl == '' &&
            <TouchableOpacity style={styles.card}
              onPress={() => setShowAlert(true)}>
              <Icon name="payment" size={120} color="colors.primary_blue" />
              <Text style={styles.cardTextSmall}>Capture or select your</Text>
              <Text style={styles.cardTextLarge}>Payslip</Text>
            </TouchableOpacity>
          }
          {imageUrl != '' &&
            <TouchableOpacity style={styles.card}
              onPress={() => setShowAlert(true)}>
              <Image style={styles.image} source={{ uri: imageUrl }}></Image>
            </TouchableOpacity>
          }
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Choose an action"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Camera"
          confirmText="Gallery"
          confirmButtonColor="colors.primary_blue"
          cancelButtonColor="colors.primary_blue"
          onCancelPressed={() => {
            requestCameraPermission();
          }}
          onConfirmPressed={() => {
            this.selectImage();
          }}
        />
        <NetworkProvider shouldPing pingInterval={100}>
          <NetworkConsumer>
            {({ isConnected }) =>
              isConnected ? (
                <CustomButton
                  name='SEND'
                  onPress={() => uploadImageToStorage(imageUrl)} />
              ) : (
                <CustomButton
                  name='SEND OFFLINE'
                  onPress={() => uploadImageToCache(imageUrl)} />
              )
            }
          </NetworkConsumer>
        </NetworkProvider>

      </View>
    </SafeAreaView>
  )
}