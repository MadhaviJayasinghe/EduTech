import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList } from "react-native";
import styles from './style';
import PageLayout from '@components/PageLayout';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClassScreen({ navigation }) {
  const [teacherId, setTeacherId] = useState('1XezRy4XBVxqdjJK7m34');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    listClasses("");
  }, []);

  const listClasses = async () => {
    const response = await firestore()
      .collection('classes')
      .where("teacherId", "==", teacherId)
      .get();
    console.log(response.docs)
    setClasses(response.docs)
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.classCard}>
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate('ViewMaterial', item._data.grade)}>
          <Icon name="google-classroom" size={80} color="#041a5e" style={{ marginTop: 30 }} />
          <Text style={styles.classCardText}>Grade {item._data.grade}</Text>
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
      <PageLayout title='Classes' />
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