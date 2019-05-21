import React, { Component } from "react";
import { StyleSheet, TextInput, Platform } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    placeholderTextColor: PropTypes.string
  };

  static defaultProps = {
    placeholder: "",
    secureTextEntry: false,
    keyboardType: "default",
    autoCapitalize: false,
    autoCorrect: false,
    placeholderTextColor: "rgba(0,0,0,0.4)"
  };

  render() {
    const {
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      autoCorrect,
      placeholderTextColor
    } = this.props;
    const androidInputStyle = Platform.OS === "android" && styles.androidInput;

    return (
      <TextInput
        style={[styles.input, androidInputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontFamily: ProductSans.regular,
    width: "100%",
    backgroundColor: Colors.white,
    borderRadius: 5,
    color: Colors.darkGray,
    fontSize: 20,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10
  },
  androidInput: {
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  }
});
