import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.string
  };

  render() {
    const { onPress, children } = this.props;

    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 20,
    width: "100%",
    backgroundColor: "#00AEEf",
    alignItems: "center",
    borderRadius: 3
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 18
  }
});
