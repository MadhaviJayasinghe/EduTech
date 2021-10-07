import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, PermissionsAndroid } from "react-native";
import styles from './style';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import PageLayout from '@components/PageLayout';

export default function ViewMaterialScreen({ route }) {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    console.log(listData)
    listFilesAndDirectories("");
  }, []);

  async function downloadFile(url, name) {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: name,
            path: `${dirs.DownloadDir}/test.pdf`,
          },
        })
          .fetch('GET', url, {})
          .then((res) => {
            console.log('The file saved to ', res.path());
          })
          .catch((e) => {
            console.log(e)
          });
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const listFilesAndDirectories = (pageToken) => {
    const folder = '1XezRy4XBVxqdjJK7m34' + '/' + route.params + '/'
    const reference = storage().ref(folder);
    reference.list({ pageToken }).then((result) => {
      if (result.nextPageToken) {
        return listFilesAndDirectories(
          reference,
          result.nextPageToken
        );
      }
      setListData(result.items);
    });
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.cardLecture}>
        <Text
          onPress={() => getItem(item.fullPath, item.name)}
        >
          {item.name}
        </Text>
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

  const getItem = async (fullPath, name) => {
    const url = await storage()
      .ref(fullPath)
      .getDownloadURL()
      .catch((e) => {
        console.error(e);
      });
    downloadFile(url, name)
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='View Materials' />
      <View style={styles.pageContainer}>
        <View style={{ height: 20 }} />
        <FlatList
          style={styles.flatlist}
          data={listData}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  )
}