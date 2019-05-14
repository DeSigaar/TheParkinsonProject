import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image, Platform } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class GoogleButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.string
  };

  render() {
    const { onPress, value } = this.props;
    const androidButtonStyle = Platform.OS === "android" && styles.androidButton;
    const androidTextStyle = Platform.OS === "android" && styles.androidText;
    const androidImageStyle = Platform.OS === "android" && styles.androidImage;

    return (
      <TouchableOpacity style={[styles.button, androidButtonStyle]} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.innerButton}>
          <Image
            style={[styles.image, androidImageStyle]}
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
            }}
          />
          <Text style={[styles.text, androidTextStyle]}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5,
    paddingTop: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    marginBottom: 10,
    backgroundColor: Colors.white
  },
  androidButton: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  innerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    position: "absolute",
    left: 0,
    width: 24,
    height: 24
  },
  androidImage: {
    width: 20,
    height: 20
  },
  text: {
    fontFamily: ProductSans.regular,
    fontSize: 20,
    color: Colors.darkGray
  },
  androidText: {
    fontSize: 16
  }
});
