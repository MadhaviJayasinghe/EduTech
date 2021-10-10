import React, { useState, useRef } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import styles from './style';
import CustomTextInput from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SignUpCredentialScreen({ navigation }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setConfirmPassword] = useState('');

  const pwdTextInput = useRef(null);

  const onRegisterPress = (navigation) => {
    if (password !== cpassword) {
      alert("Passwords does not match")
      return
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email
        };
        const usersRef = firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('SignUp', uid)
          })
          .catch((error) => {
            alert(error)
          });
      })
      .catch((error) => {
        alert(error)
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Create Profile' />

      <View style={styles.middleContainer}>
        <CustomTextInput
          placeholder='Email'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setEmail}
          keyboardType='email-address'
        />
        <CustomTextInput
          placeholder='Password'
          returnKeyType='next'
          autoFocus={false}
          secureTextEntry={true}
          onChangeText={setPassword}
          ref={pwdTextInput} />
        <CustomTextInput
          placeholder='Confirm Password'
          returnKeyType='go'
          autoFocus={false}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          ref={pwdTextInput} />
        <CustomButton
          name='NEXT'
          onPress={() => onRegisterPress(navigation)} />
      </View>
    </SafeAreaView>
  )
}