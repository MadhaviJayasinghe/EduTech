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

export default function SignUpTeacherScreen({ navigation, route }) {
  console.warn(route.params)
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const pwdTextInput = useRef(null);
  const [subject, setSubject] = useState("subject");
  const [subjects, setSubjects] = useState([]);
  const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false)
  const [toggleCheckBox4, setToggleCheckBox4] = useState(false)
  const [toggleCheckBox5, setToggleCheckBox5] = useState(false)
  const [toggleCheckBox6, setToggleCheckBox6] = useState(false)
  const [toggleCheckBox7, setToggleCheckBox7] = useState(false)
  const [toggleCheckBox8, setToggleCheckBox8] = useState(false)
  const [toggleCheckBox9, setToggleCheckBox9] = useState(false)
  const [toggleCheckBox10, setToggleCheckBox10] = useState(false)
  const [toggleCheckBox11, setToggleCheckBox11] = useState(false)

  useEffect(() => { fetchSubjects() }, [])

  const fetchSubjects = async () => {
    const response = await firestore()
      .collection('subjects')
      .get();
    setSubjects(response.docs)
  }

  ListAllSubjects = () => {
    return (subjects.map((x, i) => {
      return (<Picker.Item label={x._data.subjectName} key={i} value={x._data.subjectName} />)
    }
    ))
  }

  saveUser = async () => {
    const response = await firestore()
      .collection('teachers')
      .doc(route.params.id)
      .set({
        firstName: fName,
        lastName: lName,
        phone: contactNo,
        subject: subject
      }).then((res) => {
        xx()
        route.params.setUserToken(route.params.id) 
        route.params.setUserRole(route.params.role) 
      })
      .catch((err) => {
        console.error("Error found: ", err);
      });
  }

  async function xx (){
    var role = 'teacher'
    await AsyncStorage.setItem('userToken', route.params.id);
    await AsyncStorage.setItem('userRole', role);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Profile Details' />

      <View style={styles.middleContainer}>
        <View style={{ height: 150 }} />
        <CustomTextInput
          placeholder='First name'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setFName}
        />
        <CustomTextInput
          placeholder='Last name'
          returnKeyType='next'
          autoFocus={false}
          onChangeText={setLName}
          ref={pwdTextInput} />
        <CustomTextInput
          placeholder='Contact No'
          returnKeyType='go'
          autoFocus={false}
          onChangeText={setContactNo}
          ref={pwdTextInput} />
        <View style={styles.pickerView}>
          <Picker
            selectedValue={subject}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(subject) => setSubject(subject)} >
            <Picker.Item label="Subject" value="Subject" color='#808080' />
            {ListAllSubjects()}
          </Picker>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 10 }}>
          <View style={{ flex: 0.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => setToggleCheckBox1(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 1</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => setToggleCheckBox2(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 2</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={(newValue) => setToggleCheckBox3(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 3</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox4}
                onValueChange={(newValue) => setToggleCheckBox4(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 4</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox5}
                onValueChange={(newValue) => setToggleCheckBox5(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 5</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox6}
                onValueChange={(newValue) => setToggleCheckBox6(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 6</Text>
            </View>
          </View>
          <View style={{ flex: 0.5 }}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox7}
                onValueChange={(newValue) => setToggleCheckBox7(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 7</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox8}
                onValueChange={(newValue) => setToggleCheckBox8(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 8</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox9}
                onValueChange={(newValue) => setToggleCheckBox9(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 9</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox10}
                onValueChange={(newValue) => setToggleCheckBox10(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 10</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox11}
                onValueChange={(newValue) => setToggleCheckBox11(newValue)} />
              <Text style={{ marginTop: 5 }}>Grade 11</Text>
            </View>
          </View>
        </View>
        <CustomButton
          name='CREATE'
          onPress={() => saveUser()} />
      </View>
    </SafeAreaView >
  )
}