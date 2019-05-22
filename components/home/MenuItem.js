import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class MenuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.any,
    gradientColor: PropTypes.array,
    onPress: PropTypes.func
  };

  render() {
    // TODO: iOS Add box shadow
    const { title, img, gradientColor, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={onPress}>
        <LinearGradient colors={gradientColor} start={[0, 0]} end={[1, 1]} locations={[0.3, 1]} style={styles.gradient}>
          <Image style={styles.image} source={img} resizeMode="contain" />
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 7,
    borderRadius: 10,
    flexWrap: "wrap",
    flexGrow: 1,
    flexBasis: "45%",
    elevation: 5
  },
  text: {
    color: Colors.white,
    fontFamily: ProductSans.bold,
    marginTop: 5
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  gradient: {
    width: "100%",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25
    // shadowColor: "#000",
    // shadowOffset: { width: 20, height: 20 },
    // shadowOpacity: 1,
    // shadowRadius: 20
  }
});
