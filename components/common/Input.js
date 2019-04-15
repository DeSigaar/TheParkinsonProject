import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import PropTypes from "prop-types";

export default class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool
  };

  render() {
    const { label, value, onChangeText, placeholder, secureTextEntry } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          value={value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    borderColor: "#EEEEEE",
    borderBottomWidth: 2
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: "#333333",
    fontSize: 17,
    fontWeight: "700",
    width: "100%"
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: "#333333",
    fontSize: 18,
    width: "100%"
  }
});
