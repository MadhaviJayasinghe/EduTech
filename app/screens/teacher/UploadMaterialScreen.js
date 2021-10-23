import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import CustomButton from '@components/CustomButton';
import PageLayout from '@components/PageLayout';
import storage from '@react-native-firebase/storage';
import DocumentPicker from "react-native-document-picker";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import colors from '@res/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadMaterialScreen({ navigation }) {
  const [filePath, setFilePath] = useState({});
  const [teacherId, setTeacherId] = useState('');
  const [grade, setGrade] = useState("grade");
  const [grades, setGrades] = useState([]);

  useEffect(() => {fetchGrades()}, [])

  const _chooseFile = async () => {
    try {
      const fileDetails = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      alert(
        DocumentPicker.isCancel(error)
          ? "Canceled"
          : "Unknown Error: " + JSON.stringify(error)
      );
    }
  };

  uploadMaterials = (filePath) => {
    async function upload(fileDetails) {
      await storage().ref(teacherId + '/' + grade + '/' + fileDetails.name).putFile(fileDetails.uri)
    }
    filePath.forEach(filePath => upload(filePath))
  }

  ListAllGrades = () => {
    return (grades.map((x, i) => {
      console.log(grades)
      var grade = 'Grade ' + x._data.grade
      return (<Picker.Item label={grade} key={i} value={x._data.grade} />)
    }
    ))
  }

  const fetchGrades = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setTeacherId(userToken)
    const response = await firestore()
      .collection('classes')
      .where("teacherId", "==", userToken)
      .get();
    setGrades(response.docs)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Upload Materials' />
      <View style={styles.pageContainer}>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={grade}
            style={{ height: 50, width: '100%' }}
            mode={"dropdown"}
            onValueChange={(grade) => setGrade(grade)} >
            <Picker.Item label="Grade" value="Grade" color='#808080' />
            {ListAllGrades()}
          </Picker>
        </View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.card}
            onPress={_chooseFile}>
            <Icon name="note-text-outline" size={110} color={colors.primary_blue} />
            <Text style={styles.cardTextSmall}>Click here to select</Text>
            <Text style={styles.cardTextLarge}>Study Materials</Text>
            <Text style={styles.cardTextSmall}> You have selected:{" "}
              {Object.keys(filePath).length == 0
                ? 0
                : Object.keys(filePath).length} </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          name='UPLOAD MATERIALS'
          onPress={() => uploadMaterials(filePath)} />
      </View>
    </SafeAreaView>
  )
}