import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, SignUpScreen } from './screens'

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
export default StackNav;