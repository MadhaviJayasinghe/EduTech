import React, { Component, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStackNav from '@app/AuthStack'
import AppStackNav from '@app/AppStack'

export default function Navigation() {
    const [userToken, setUserToken] = useState(undefined)
    const [role, setRole] = useState(undefined)

    const bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const role = await AsyncStorage.getItem('role');
        setUserToken(userToken)
        setRole(role)
    };

    useEffect(() => bootstrapAsync(), [])

    if (userToken) {
        return (
            <AppStackNav />
        );
    }
    else {
        return (
            <AuthStackNav setUserToken={setUserToken} setRole={setRole} />
        )
    }



}
