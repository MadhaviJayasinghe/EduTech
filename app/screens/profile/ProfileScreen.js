import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text, Platform, Image, PermissionsAndroid, TextInput } from 'react-native';
import styles from './style';
import storage from '@react-native-firebase/storage';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import AwesomeAlert from 'react-native-awesome-alerts';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NetworkConsumer, NetworkProvider } from 'react-native-offline';
import style from '../student/style';
import colors from '@res/colors';

export default function ProfileScreen({ navigation }) {
  console.log(RNFS.CachesDirectoryPath);
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken)

    const name = await AsyncStorage.getItem('fullName');
    setName(name)

    const phone = await AsyncStorage.getItem('phone');
    setPhone(phone)
  }

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
      cropping: true,
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
    const imagePath = RNFS.CachesDirectoryPath + '/'
    const iName = path.split('/').pop();
    console.log('Filename is ', iName)
    const newPath = `${RNFS.ExternalCachesDirectoryPath}/${iName}`; 

    RNFS.copyFile(path, newPath)
      .then((success) => {
        console.log('IMG COPIED!');
        console.log(success);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const fileName = 'file://' + newPath;
    await AsyncStorage.setItem('paidTeacher', teacherId);
    await AsyncStorage.setItem('paidGrade', grade);
    await AsyncStorage.setItem('payslip', fileName);
  }

  sendPayslip = async () => {
    const url = await storage().ref('payments/' + imageName).getDownloadURL()
    const response = await firestore()
      .collection('payments')
      .add({
        teacherId: teacherId,
        grade: grade,
        studentId: userToken,
        slip: url
      }).then((res) => {
        console.warn(res)
        console.log(response)
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  signOut = async () => {
    await AsyncStorage.removeItem('userToken');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Profile' />
      <View style={styles.pageContainer}>
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
          confirmButtonColor={colors.primary_blue}
          cancelButtonColor={colors.primary_blue}
          onCancelPressed={() => {
            requestCameraPermission();
          }}
          onConfirmPressed={() => {
            selectImage();
          }}
        />
        {imageUrl == '' &&
          <TouchableOpacity style={styles.image}
            onPress={() => setShowAlert(true)}>
            <Icon name="person-add-alt-1" size={80} color={colors.primary_blue}/>
          </TouchableOpacity>
        }
        {imageUrl != '' &&
          <TouchableOpacity
            onPress={() => setShowAlert(true)}>
            <Image style={styles.image} source={{ uri: imageUrl }}></Image>
          </TouchableOpacity>
        }
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            autoFocus={false}
            value={name}
            editable={false} />
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.textInput}
            value={phone}
            autoFocus={false}
            editable={false} />
            <TouchableOpacity style={styles.logout}
              onPress={() => signOut()}>
              <Icon name="logout" size={40} color="red" />
            <Text style={styles.logoutText}>Signout</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}