import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import styles from './style';
import CustomTextInput from '@components/CustomTextInput';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JoinClassRoomScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [teacher, setTeacher] = useState("teacher");
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("subject");
  const [grade, setGrade] = useState("grade");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => { fetchSubjects() }, [])

  const fetchTeachers = async (sId) => {
    
    const response = await firestore()
      .collection('teachers')
      .where("subject", "==", sId)
      .get();
    setTeachers(response.docs)
  }

  ListAllTeachers = () => {
    return (teachers.map((x, i) => {
      return (<Picker.Item label={x._data.firstName} key={i} value={x.id} />)
    }
    ))
  }

  const fetchSubjects = async () => {
    const response = await firestore()
      .collection('subjects')
      .get();
    setSubjects(response.docs)
  }

  ListAllSubjects = () => {
    return (subjects.map((x, i) => {
      return (<Picker.Item label={x._data.subjectName} key={i} value={x.id} />)
    }
    ))
  }

  request = async () => {
    const studentId = await AsyncStorage.getItem('userToken');
    const response = await firestore()
      .collection('requests')
      .add({
        studentName: name,
        studentId: studentId,
        subject: subject,
        teacherId: teacher,
        grade: grade,
        status: 'SENT'
      }).then((res) => {
        navigation.navigate('StudentHome')
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  async function xx() {
    var role = 'teacher'
    await AsyncStorage.setItem('userToken', route.params.id);
    await AsyncStorage.setItem('userRole', role);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Join Classroom' />
      <View style={styles.pageContainer}>
        <CustomTextInput
          placeholder='Student name'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setName}
        />
        <View style={styles.pickerView}>
          <Picker
            selectedValue={subject}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(subject) => {setSubject(subject), fetchTeachers(subject)}} >
            <Picker.Item label="Subject" value="Subject" color='#808080' />
            {ListAllSubjects()}
          </Picker>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={teacher}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(teacher) => setTeacher(teacher)} >
            <Picker.Item label="Teacher" value="Subject" color='#808080' />
            {ListAllTeachers()}
          </Picker>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={grade}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(grade) => setGrade(grade)} >
            <Picker.Item label="Grade" value="Grade" color='#808080' />
            <Picker.Item label="Grade 1" value="1" />
            <Picker.Item label="Grade 2" value="2" />
            <Picker.Item label="Grade 3" value="3" />
            <Picker.Item label="Grade 4" value="4" />
            <Picker.Item label="Grade 5" value="5" />
            <Picker.Item label="Grade 6" value="6" />
            <Picker.Item label="Grade 7" value="7" />
            <Picker.Item label="Grade 8" value="8" />
            <Picker.Item label="Grade 9" value="9" />
            <Picker.Item label="Grade 10" value="10" />
            <Picker.Item label="Grade 11" value="11" />
            {ListAllTeachers()}
          </Picker>
        </View>
        <CustomButton
          name='Request'
          onPress={() => request()} />
          <View style={{ height: 150 }} />
      </View>
    </SafeAreaView >
  )
}