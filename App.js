import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import AuthStackNav from '@app/AuthStack'
import { LogBox  } from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
    LogBox.ignoreAllLogs()
  })

  return (
    <NavigationContainer>
      <AuthStackNav />
    </NavigationContainer>
  );
};

export default App;