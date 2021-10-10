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

export default function StudentHomeScreen({ navigation }) {
  const [userToken, setUserToken] = useState('');
  const [path, setPath] = useState('');
  const [paidTeacher, setPaidTeacher] = useState('');
  const [paidGrade, setPaidGrade] = useState('');
  useEffect(() => {
    fetchPayslip("");
  }, []);

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
        slip: path
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
      <Text style={{ fontSize: 26, color: colors.white, marginLeft: 5, textAlign: 'right' }}>Hello,</Text>
      <Text style={{ fontWeight: '500', fontSize: 50, color: colors.white, marginLeft: 5, textAlign: 'right', marginTop: -20 }}>Stepheni</Text>
      <View style={styles.middleContainer}>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.largeButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ClassList') }}>
              <Icon name="book-open-page-variant" size={85} color={colors.white} style={{ alignSelf: 'center', marginTop: 15, marginBottom: 15 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Study Materials</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.smallButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Payment') }}>
              <FontAwesome5Icon name="wallet" size={65} color={colors.white} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.mediumButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('JoinClassRoom') }}>
              <FontAwesome5Icon name="chalkboard-teacher" size={65} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 25 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Join Classroom</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.mediumButton1}>
          <TouchableOpacity
              onPress={() => { navigation.navigate('Notifications') }}>
             <MaterialIcon name="notifications" size={65} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 25 }} />
            <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Notifications</Text>
          </TouchableOpacity>
             </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.largeButton1}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ChatRoom') }}>
              <Icon name="chat" size={85} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 5 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.smallButton1}>
          <TouchableOpacity
              onPress={() => { navigation.navigate('Profile') }}>
              <MaterialIcon name="person" size={65} color={colors.white} style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
             </View>
          <View style={styles.space} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 26, color: colors.white, marginLeft: 15, textAlign: 'left', marginTop: 50 }}>EduTech</Text>
      </View>
    </View>
  )
}