import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import PropTypes from "prop-types";

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    keyboardType: PropTypes.string,
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool
  };

  render() {
    const { value, onChangeText, placeholder, secureTextEntry, keyboardType, autoCapitalize, autoCorrect } = this.props;
    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"rgba(0,0,0,0.4)"}
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
    fontFamily: "product-sans",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    color: "#000000",
    fontSize: 20,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10
  }
});
