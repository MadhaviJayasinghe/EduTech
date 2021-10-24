import React, { useState, useRef } from 'react';
import { Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './style';
import images from '@images';
import CustomTextInput from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const pwdTextInput = useRef(null);

  const onLoginPress = (navigation) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    route.params.setUserToken(uid) 
                    saveUID(uid)
                    fetchData(uid)
                    
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })
}

async function saveUID (uid){
  await AsyncStorage.setItem('userToken', uid);
}

const fetchData = async (uid) => {
  const teacherResponse = await firestore().collection('teachers').doc(uid).get();
  const studentResponse = await firestore().collection('students').doc(uid).get();

  if(teacherResponse._data != undefined) {
    await AsyncStorage.setItem('fullName', teacherResponse._data.firstName + " " + teacherResponse._data.lastName);
    await AsyncStorage.setItem('firstName', teacherResponse._data.firstName);
    await AsyncStorage.setItem('phone', teacherResponse._data.phone);

    route.params.setName(teacherResponse._data.firstName) 
  }
  else if(studentResponse._data != undefined) {
    await AsyncStorage.setItem('fullName', studentResponse._data.firstName + " " + studentResponse._data.lastName);
    await AsyncStorage.setItem('firstName', studentResponse._data.firstName);
    await AsyncStorage.setItem('phone', studentResponse._data.phone);

    route.params.setName(studentResponse._data.firstName) 
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.logo_blue} style={styles.logo} />
      <CustomTextInput
        placeholder='Email'
        returnKeyType='next'
        autoFocus={false}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <CustomTextInput
        placeholder='Password'
        returnKeyType='go'
        autoFocus={false}
        secureTextEntry={true}
        onChangeText={setPassword}
        ref={pwdTextInput} />
      <CustomButton
        name='SIGN IN'
        onPress={() => onLoginPress(navigation)} />
      <TouchableOpacity 
        style={styles.signUpBtn}
        onPress={() => {navigation.navigate('SignUpCredential')}}>
        <Text>Don't have an account? </Text>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}