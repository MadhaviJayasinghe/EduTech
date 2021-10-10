import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import AuthStackNav from '@app/AuthStack'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <NavigationContainer>
      <AuthStackNav />
    </NavigationContainer>
  );
};

export default App;