import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class PageLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.topContainer}>
          <View style={styles.headingView}>
            <TouchableOpacity>
              <Icon name="keyboard-backspace" size={40} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.heading}>{this.props.title}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
        </View>
      </View>
    );
  }
}