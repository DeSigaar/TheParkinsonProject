import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Chevron extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.string,
    direction: PropTypes.string.isRequired
  };

  render() {
    const { onPress, value, direction } = this.props;

    return (
      <TouchableOpacity
        style={[styles.chevron, direction === "left" ? styles.left : styles.right]}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <View style={styles.container}>
          {direction === "left" && <AntDesign style={[styles.icon, styles.iconLeft]} name="left" />}
          <Text style={[styles.text, Platform.OS === "android" && styles.androidText]}>{value}</Text>
          {direction === "right" && <AntDesign style={[styles.icon, styles.iconRight]} name="right" />}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  chevron: {
    padding: 10,
    position: "absolute",
    bottom: -10
  },
  left: {
    left: -10
  },
  right: {
    right: -10
  },
  text: {
    fontFamily: ProductSans.regular,
    fontSize: 20,
    color: Colors.white
  },
  androidText: {
    fontSize: 16
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white,
    fontSize: 16
  },
  iconLeft: {
    marginRight: 5
  },
  iconRight: {
    marginLeft: 5
  }
});
