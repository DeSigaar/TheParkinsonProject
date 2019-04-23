import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  render() {
    const { onPress, value, type } = this.props;
    const styleBackground = type === "dark" ? styles.darkBackground : styles.lightBackground;
    const styleText = type === "dark" ? styles.lightText : styles.darkText;

    return (
      <TouchableOpacity style={[styles.button, styleBackground]} onPress={onPress} activeOpacity={0.8}>
        <Text style={[styles.text, styleText]}>{value}</Text>
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
    fontFamily: ProductSans.regular,
    fontSize: 20
  },
  darkText: {
    color: Colors.darkGray
  },
  lightText: {
    color: Colors.white
  },
  darkBackground: {
    backgroundColor: Colors.darkGray
  },
  lightBackground: {
    backgroundColor: Colors.white
  }
});
