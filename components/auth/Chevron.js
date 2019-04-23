import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class Chevron extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    type: PropTypes.string.isRequired
  };

  render() {
    const { onPress, title, type } = this.props;
    const typeStyle = type === "dark" ? styles.dark : styles.light;
    return (
      <TouchableOpacity style={[styles.chevron, typeStyle]} onPress={onPress} activeOpacity={0.75}>
        <View>
          <FontAwesome name="chevron-left" size={32} color="black" />

          <Text style={[styles.text, typeStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chevron: {
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
