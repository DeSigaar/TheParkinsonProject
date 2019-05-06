import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Divider extends Component {
  render() {
    const androidTextStyle = Platform.OS === "android" ? styles.androidText : null;
    return (
      <View style={styles.container}>
        <View style={styles.divider} />
        <Text style={[styles.text, androidTextStyle]}>of</Text>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  divider: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 1,
    width: "35%"
  },
  text: {
    fontFamily: ProductSans.bold,
    color: Colors.white,
    fontSize: 20
  },
  androidText: {
    fontSize: 16
  }
});
