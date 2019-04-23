import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  render() {
    const { onPress, title, type } = this.props;
    const typeStyle = type === "dark" ? styles.dark : styles.light;
    return (
      <TouchableOpacity style={[styles.button, typeStyle]} onPress={onPress} activeOpacity={0.8}>
        <Text style={[styles.text, typeStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10
  },
  text: {
    fontFamily: "product-sans",
    fontSize: 20
  },
  dark: {
    backgroundColor: "#454545",
    color: "#FFFFFF"
  },
  light: {
    backgroundColor: "#FFFFFF",
    color: "#454545"
  }
});
