import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import {
  LoginScreen, SignUpCredentialScreen, SignUpScreen, SignUpTeacherScreen,
  SignUpStudentScreen, TeacherHomeScreen, ChatRoom, Messages, StudyMaterialScreen,
  UploadMaterialScreen, ViewMaterialScreen, ClassRoomScreen, StudentHomeScreen,
  PaymentScreen
} from './screens'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function AuthStackNav() {
  const [userToken, setUserToken] = useState(undefined)

  const bootstrapAsync = async () => {
    console.warn('cc')
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken)
  };

  useEffect(() => bootstrapAsync(), [])
  return (
    <Stack.Navigator
      initialRouteName={userToken == null ? "Login" : "StudentHome"}
      screenOptions={{ headerShown: false }} >
      {userToken == null ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ setUserToken }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignUpCredential" component={SignUpCredentialScreen} />
          <Stack.Screen name="SignUpTeacher" component={SignUpTeacherScreen} />
          <Stack.Screen name="SignUpStudent" component={SignUpStudentScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
          <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="StudyMaterial" component={StudyMaterialScreen} />
          <Stack.Screen name="UploadMaterial" component={UploadMaterialScreen} />
          <Stack.Screen name="ViewMaterial" component={ViewMaterialScreen} />
          <Stack.Screen name="ClassRoom" component={ClassRoomScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}
export default AuthStackNav;