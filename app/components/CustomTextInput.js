import React from "react";
import { TextInput, PixelRatio } from "react-native";
import styles from './style';

export default class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholderTextColor='#808080'
        fontSize={16 / PixelRatio.getFontScale()}
        {...this.props}
      />
    );
  }
}