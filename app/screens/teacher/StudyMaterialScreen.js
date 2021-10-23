import React from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PageLayout from '@components/PageLayout';
import colors from '@res/colors';

export default function StudyMaterialScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageLayout title='Study Materials' />
      <View style={styles.pageContainer}>
        <View style={styles.margin} />
        <View style={styles.materialOption}>
          <TouchableOpacity style={styles.materialOption}
            onPress={() => { navigation.navigate('UploadMaterial') }}>
            <Icon name="file-upload-outline" size={120} color={colors.primary_blue}/>
            <Text style={styles.materialOptionText}>Upload Materials</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whiteSpace} />
        <View style={styles.materialOption}>
          <TouchableOpacity style={styles.materialOption}
            onPress={() => { navigation.navigate('Class') }}>
            <Icon name="file-document-outline" size={120} color={colors.primary_blue}/>
            <Text style={styles.materialOptionText}>View Materials</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}