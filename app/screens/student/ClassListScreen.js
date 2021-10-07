import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList } from "react-native"; 
import styles from './style';
import PageLayout from '@components/PageLayout';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ClassListScreen({ navigation }) {
  const [studentId, setStudentId] = useState('bsD6wtTnhdMNLXv5PDad');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    listMyClasses("");
  }, []);

  const listMyClasses = async () => {
    const response = await firestore()
      .collection('registered_classes')
      .where("studentId", "==", studentId)
      .get();
    setClasses(response.docs)
  };

  const ItemView = ({ item }) => {
    var data = {
      grade: item._data.grade,
      subject: item._data.subject,
      teacherId: item._data.teacherId
    }
    return (
      <View style={styles.classCard}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('ClassMaterial', {data} )}>
          <Text style={styles.cardTextLarge}>{item._data.subject}</Text>
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
      <PageLayout title='My Classes' />
      <View style={styles.pageContainer}>
        <FlatList
          style={styles.flatlist}
          numColumns={2}
          data={classes}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}