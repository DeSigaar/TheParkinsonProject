import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default class Chevron extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    direction: PropTypes.string.isRequired
  };

  render() {
    const { onPress, title, direction } = this.props;
    const directionStyle = direction === "left" ? styles.left : styles.right;
    return (
      <TouchableOpacity style={[styles.chevron, directionStyle]} onPress={onPress} activeOpacity={0.5}>
        <View style={styles.container}>
          {direction === "left" ? <AntDesign style={styles.iconLeft} name="left" size={18} color="white" /> : null}
          <Text style={styles.text}>{title}</Text>
          {direction === "right" ? <AntDesign style={styles.iconRight} name="right" size={18} color="white" /> : null}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chevron: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    position: "absolute",
    bottom: 0
  },
  left: {
    left: 0
  },
  right: {
    right: 0
  },
  text: {
    fontFamily: "product-sans",
    fontSize: 20,
    color: "#FFFFFF"
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconLeft: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  iconRight: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5
  }
});
