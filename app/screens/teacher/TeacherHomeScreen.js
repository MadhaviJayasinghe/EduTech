import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '@res/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TeacherHomeScreen({ navigation }) {
  const [name, setName] = useState('');

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const name = await AsyncStorage.getItem('firstName');
    setName(name)
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, color: colors.white, marginLeft: 5, textAlign: 'right' }}>Hello,</Text>
      <Text style={{ fontWeight: '500', fontSize: 50, color: colors.white, marginLeft: 5, textAlign: 'right', marginTop: -20 }}>{name}</Text>
      <View style={styles.middleContainer}>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.largeButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('StudyMaterial') }}>
              <Icon name="book-open-page-variant" size={85} color={colors.white} style={{ alignSelf: 'center', marginTop: 15, marginBottom: 15 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Study Materials</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.smallButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ViewPayments') }}>
              <FontAwesome5Icon name="wallet" size={65} color={colors.white} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.mediumButton}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ClassRoom') }}>
              <FontAwesome5Icon name="chalkboard-teacher" size={65} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 25 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Class Rooms</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.mediumButton1}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('StudentHandle') }}>
              <MaterialIcon name="notifications" size={65} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 25 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Notifications</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
        </View>
        <View style={styles.row}>
          <View style={styles.space} />
          <View style={styles.largeButton1}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('ChatRoom') }}>
              <Icon name="chat" size={85} color={colors.white} style={{ alignSelf: 'center', marginTop: 25, marginBottom: 5 }} />
              <Text style={{ fontSize: 16, color: colors.white, marginLeft: 5 }}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
          <View style={styles.smallButton1}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('Profile') }}>
              <MaterialIcon name="person" size={65} color={colors.white} style={{ alignSelf: 'center' }} />
            </TouchableOpacity>
          </View>
          <View style={styles.space} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={{ fontSize: 26, color: colors.white, marginLeft: 5, textAlign: 'left', marginTop: 50 }}>EduTech</Text>

      </View>
    </View>
  )
}