import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import styles from './style';
import PageLayout from '@components/PageLayout';
import DocumentPicker from "react-native-document-picker";
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '@res/colors';

export default function ClassRoomScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [teacherId, setTeacherId] = useState('1XezRy4XBVxqdjJK7m34');
  const [filePath, setFilePath] = useState({});

  useEffect(() => { fetchData() }, []);

  const fetchData = async () => {
    try {
      const response = await firestore()
        .collection("classes")
        .where("teacherId", "==", teacherId)
        .get();
      setListData(response.docs)
    } catch (err) {
      console.error(err);
    }
  };

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

  const ItemView = ({ item }) => {
    return (
      <View style={styles.classCard}>
        <TouchableOpacity onPress={() => navigation.navigate('ViewStudents', item._data.grade)}>
        <Icon name="google-classroom" size={80} color="colors.primary_blue" style={{ marginTop: 30 }} />
        <Text style={styles.cardTextMedium}>Grade {item._data.grade}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Class Rooms' />
      <View style={styles.pageContainer}>
        <FlatList
          style={styles.flatlist}
          numColumns={2}
          data={listData}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}