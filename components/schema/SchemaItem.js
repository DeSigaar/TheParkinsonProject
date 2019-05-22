import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class SchemaItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.any,
    gradientColor: PropTypes.array
    // onPress: PropTypes.func
  };

  render() {
    const { title, description, img, gradientColor } = this.props;

    return (
      <LinearGradient style={styles.gradient} colors={gradientColor} start={[0, 0]} end={[1, 1]} locations={[0.3, 1]}>
        <Image style={styles.image} source={img} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.textBig}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    marginTop: 5,
    fontFamily: ProductSans.regular
  },
  textBig: {
    color: Colors.white,
    marginTop: 3,
    fontSize: 22,
    fontFamily: ProductSans.regular
  },
  textContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingLeft: 20
  },
  image: {
    width: 50,
    height: 50
  },
  gradient: {
    height: 75,
    width: "100%",
    elevation: 5,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 7
  }
});
