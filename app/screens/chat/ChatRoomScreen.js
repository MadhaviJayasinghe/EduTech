import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import styles from './style';
import firestore from '@react-native-firebase/firestore'
import PageLayout from '@components/PageLayout';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Dialog from "react-native-dialog";

export default function ChatRoomScreen({ navigation }) {
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [roomName, setRoomName] = useState('');
  const [visible, setVisible] = useState(false)


  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })

        setThreads(threads)
        console.log(threads)
        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <ActivityIndicator size='large' color='#555' />
  }

  function handleButtonPress() {
    console.warn(roomName)
    setVisible(false)
    if (roomName.length > 0) {
      firestore()
        .collection('MESSAGE_THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime(),
            system: true
          })
          navigation.navigate('ChatRoom')
        })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Chat Room' />
      <View style={styles.middleContainer}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Create chat room</Dialog.Title>
        <Dialog.Input placeholder="Chat name"/>
        <Dialog.Button label="Create"  
        onChangeText={setRoomName} 
        onPress={() =>{ handleButtonPress() }} />
      </Dialog.Container>
        {/* <TextInput style={{ height: 50, width: 100 }} onChangeText={setRoomName} />
        <TouchableOpacity style={{ height: 20, width: 50 }}
        onPress={() => { handleButtonPress() }}><Text>Create</Text></TouchableOpacity> */}
        <FlatList
          data={threads}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Messages', { thread: item })}>
              <View style={styles.row}>
                <View style={styles.content}>
                  <View style={styles.header}>
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={styles.contentText}>
                    {item.latestMessage.text.slice(0, 90)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.createButton}
        onPress = {() => {console.log(roomName), setVisible(true)}}>
        <Icon name="add" size={50} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}