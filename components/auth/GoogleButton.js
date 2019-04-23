import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";
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

    return (
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.innerButton}>
          <Image
            style={styles.image}
            source={{
              uri: "https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
            }}
          />
          <Text style={styles.text}>{value}</Text>
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
  text: {
    fontFamily: ProductSans.regular,
    fontSize: 20,
    color: Colors.darkGray
  }
});
