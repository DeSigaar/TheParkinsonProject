import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
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
    placeHolderTextColor: PropTypes.string
  };

  static defaultProps = {
    placeholder: "",
    secureTextEntry: false,
    keyboardType: "default",
    autoCapitalize: "none",
    autoCorrect: false,
    placeHolderTextColor: "rgba(0,0,0,0.4)"
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
      placeHolderTextColor
    } = this.props;
    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeHolderTextColor}
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
    color: Colors.black,
    fontSize: 20,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10
  }
});
