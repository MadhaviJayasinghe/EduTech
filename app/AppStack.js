import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import {
  LoginScreen, SignUpCredentialScreen, SignUpScreen, SignUpTeacherScreen,
  SignUpStudentScreen, TeacherHomeScreen, ChatRoomScreen, Messages, StudyMaterialScreen,
  UploadMaterialScreen, ViewMaterialScreen
} from './screens'

const Stack = createStackNavigator();

function AppStackNav() {
  return (
    <Stack.Navigator
      initialRouteName="TeacherHome"
      screenOptions={{ headerShown: false }} >
      <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="StudyMaterial" component={StudyMaterialScreen} />
      <Stack.Screen name="UploadMaterial" component={UploadMaterialScreen} />
      <Stack.Screen name="ViewMaterial" component={ViewMaterialScreen} />
          <Stack.Screen name="ClassRoom" component={ClassRoomScreen} />
<Stack.Screen name="StudentHome" component={StudentHomeScreen} />

    </Stack.Navigator>
  )
}
export default AppStackNav;