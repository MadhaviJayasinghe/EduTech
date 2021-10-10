import React, { useState, useRef } from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './style';
import CustomTextInput from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpStudentScreen({ navigation, route }) {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const pwdTextInput = useRef(null);

  saveUser = async () => {
    const response = await firestore()
      .collection('students')
      .add({
        id: route.params.id,
        firstName: fName,
        lastName: lName,
        phone: contactNo
      }).then((res) => {
        xx()
        navigation.navigate('StudentHome')
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  async function xx (){
    await AsyncStorage.setItem('userToken', route.params.id);
    await AsyncStorage.setItem('role', 'teacher');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Profile Details' />

      <View style={styles.middleContainer}>
        <CustomTextInput
          placeholder='First name'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setFName}
          keyboardType='email-address'
        />
        <CustomTextInput
          placeholder='Last name'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setLName}
          ref={pwdTextInput} />
        <CustomTextInput
          placeholder='Contact No'
          returnKeyType='go'
          autoFocus={false}
          onChangeText={setContactNo}
          ref={pwdTextInput} />
        <CustomButton
          name='CREATE'
          onPress={() => { saveUser()}} />
      </View>
    </SafeAreaView>
  )
}