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
    const directionStyle = direction === "left" ? styles.left : styles.right;
    const androidTextStyle = Platform.OS === "android" ? styles.androidText : null;

    return (
      <TouchableOpacity style={[styles.chevron, directionStyle]} onPress={onPress} activeOpacity={0.5}>
        <View style={styles.container}>
          {direction === "left" ? <AntDesign style={[styles.icon, styles.iconLeft]} name="left" /> : null}
          <Text style={[styles.text, androidTextStyle]}>{value}</Text>
          {direction === "right" ? <AntDesign style={[styles.icon, styles.iconRight]} name="right" /> : null}
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
