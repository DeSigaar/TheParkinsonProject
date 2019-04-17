import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.string
  };

  render() {
    const { onPress, children } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.75}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#454545",
    borderRadius: 5,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10
  },
  text: {
    fontFamily: "product-sans",
    color: "#FFFFFF",
    fontSize: 20
  }
});
