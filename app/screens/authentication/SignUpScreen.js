import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './style';
import PageLayout from '@components/PageLayout';

export default function SignUpScreen({ navigation, route }) {
console.warn(route.params)
  var teacherObj = {
    role: 'teacher',
    id: route.params
  }

  var studentObj = {
    role: 'student',
    id: route.params
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Select Role' />

      <View style={styles.middleContainer}>

        <View style={styles.bodyContainer}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.card}
              onPress={() => { navigation.navigate('SignUpTeacher', teacherObj) }}>
              <Icon name="teach" size={150} color="colors.primary_blue" />
              <Text style={styles.cardText}>TEACHER</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.whiteSpace} />
          <View style={styles.card}>
            <TouchableOpacity style={styles.card}
              onPress={() => { navigation.navigate('SignUpStudent', studentObj) }}>
              <Icon name="school" size={150} color="colors.primary_blue" />
              <Text style={styles.cardText}>STUDENT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    </SafeAreaView>
  )
}