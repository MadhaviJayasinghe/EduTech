import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import colors from '@res/colors';
import { useFocusEffect } from '@react-navigation/native';

export default function StudentHomeScreen({ navigation, route }) {
  const [userToken, setUserToken] = useState('');
  const [path, setPath] = useState('');
  const [paidTeacher, setPaidTeacher] = useState('');
  const [paidGrade, setPaidGrade] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    fetchPayslip("");
    fetchData()
  }, []);

  const fetchData = async () => {
    const name = await AsyncStorage.getItem('firstName');
    setName(name)
  }

  const fetchPayslip = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const path = await AsyncStorage.getItem('payslip');
    const paidTeacher = await AsyncStorage.getItem('paidTeacher');
    const paidGrade = await AsyncStorage.getItem('paidGrade');
    setUserToken(userToken)
    setPath(path)
    setPaidGrade(paidGrade)
    setPaidTeacher(paidTeacher)
    uploadImageToStorage()
  };

  uploadImageToStorage = () => {
    var imageName = path.split("/").pop()
    let reference = storage().ref('payments/' + imageName);
    let task = reference.putFile(path);
    task.then(() => {
      sendPayslip(imageName)
      console.log('Image uploaded to the bucket!');
    }).catch((e) => {
      console.log('uploading image error => ', e);
    });
  }

  sendPayslip = async (imageName) => {
    const url = await storage().ref('payments/' + imageName).getDownloadURL()
    const response = await firestore()
      .collection('payments')
      .add({
        teacherId: paidTeacher,
        grade: paidGrade,
        studentId: userToken,
        slip: url
      }).then((res) => {
        console.log(res)
        console.log(response)
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hello,</Text>
      <Text style={styles.greeting}>{name}</Text>
      <View style={styles.middleContainer}>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={[{backgroundColor: colors.metro_indigo}, styles.largeButton]}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ClassList') }}>
              <Icon name="book-open-page-variant" size={85} color={colors.white} style={styles.largeIcon} />
              <Text style={styles.buttonText}>Study Materials</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={[{backgroundColor: colors.metro_lime}, styles.smallButton]}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Payment') }}>
              <FontAwesome5Icon name="wallet" size={65} color={colors.white} style={styles.smallIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={[styles.mediumButton, {backgroundColor: colors.metro_amber}]}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('JoinClassRoom') }}>
              <FontAwesome5Icon name="chalkboard-teacher" size={65} color={colors.white} style={styles.mediumIcon} />
              <Text style={styles.buttonText}>Join Classroom</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={[styles.mediumButton, {backgroundColor: colors.metro_cyan}]}>
          <TouchableOpacity
              onPress={() => { navigation.navigate('Notifications') }}>
             <MaterialIcon name="notifications" size={65} color={colors.white} style={styles.mediumIcon} />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>
             </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={[{backgroundColor: colors.metro_emerald}, styles.largeButton]}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ChatRoom') }}>
              <Icon name="chat" size={85} color={colors.white} style={styles.icon} />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={[{backgroundColor: colors.metro_orange}, styles.smallButton]}>
          <TouchableOpacity
              onPress={() => { navigation.navigate('Profile') }}>
              <MaterialIcon name="person" size={65} color={colors.white} style={styles.smallIcon} />
          </TouchableOpacity>
             </View>
          <View style={styles.space} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>EduTech</Text>
      </View>
    </View>
  )
}