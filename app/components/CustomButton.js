import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from './style';

export default class CustomButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        {...this.props} >
        <Text style={styles.buttonText}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}