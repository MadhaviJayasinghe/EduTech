import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import {
  LoginScreen, SignUpCredentialScreen, SignUpScreen, SignUpTeacherScreen,
  SignUpStudentScreen, TeacherHomeScreen, ChatRoomScreen, Messages, StudyMaterialScreen,
  UploadMaterialScreen, ViewMaterialScreen, ClassRoomScreen, StudentHomeScreen,
  PaymentScreen, ClassListScreen, ClassMaterialScreen, ClassScreen, StudentHandleScreen, 
  ViewStudentsScreen, JoinClassRoomScreen, NotificationScreen, ProfileScreen,
  ViewPaymentsScreen
} from './screens'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function AuthStackNav() {
  const [userToken, setUserToken] = useState(undefined)
  const [userRole, setUserRole] = useState(undefined)

  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setUserToken(userToken)

    const userRole = await AsyncStorage.getItem("userRole");
    setUserRole(userRole)
  };

  useEffect(() => bootstrapAsync(), [], console.log(userToken + userRole))
  return (
    <Stack.Navigator
      initialRouteName={userToken == null ? "Login" : userRole == 'teacher' ? "TeacherHome" : "StudentHome"}
      screenOptions={{ headerShown: false }} >
      {userToken == null &&
        <>
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ setUserToken ,setUserRole }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignUpCredential" component={SignUpCredentialScreen} />
          <Stack.Screen name="SignUpTeacher" component={SignUpTeacherScreen} initialParams={{ setUserToken, setUserRole }}/>
          <Stack.Screen name="SignUpStudent" component={SignUpStudentScreen} />
        </>
      
     }
     {userToken != null &&
        <>
                  <Stack.Screen name="StudentHome" component={StudentHomeScreen} />

          <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="StudyMaterial" component={StudyMaterialScreen} />
          <Stack.Screen name="UploadMaterial" component={UploadMaterialScreen} />
          <Stack.Screen name="ViewMaterial" component={ViewMaterialScreen} />
          <Stack.Screen name="ClassRoom" component={ClassRoomScreen} />
          {/* <Stack.Screen name="StudentHome" component={StudentHomeScreen} /> */}
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="ClassList" component={ClassListScreen} />
          <Stack.Screen name="ClassMaterial" component={ClassMaterialScreen} />
          <Stack.Screen name="Class" component={ClassScreen} />
          <Stack.Screen name="StudentHandle" component={StudentHandleScreen} />
          <Stack.Screen name="ViewStudents" component={ViewStudentsScreen} />
          <Stack.Screen name="JoinClassRoom" component={JoinClassRoomScreen} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ViewPayments" component={ViewPaymentsScreen} />
           </>
      
     }
    </Stack.Navigator>
  )
}
export default AuthStackNav;