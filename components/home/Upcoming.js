import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Upcoming extends Component {
  static propTypes = {
    img: PropTypes.any,
    gradientColor: PropTypes.array,
    onPress: PropTypes.func,
    topText: PropTypes.string,
    time: PropTypes.string
  };

  render() {
    const { img, gradientColor, onPress, topText, time } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
        <LinearGradient colors={gradientColor} start={[0, 0]} end={[1, 1]} locations={[0.3, 1]} style={styles.gradient}>
          <Image style={styles.image} source={img} resizeMode="contain" />
        </LinearGradient>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <Text style={styles.smallText}>{topText}</Text>
            <Text style={styles.bigText}>{time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 7,
    alignSelf: "baseline",
    flexWrap: "wrap",
    flexBasis: "90%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    elevation: 4,
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  textContainer: {
    paddingLeft: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  smallText: {
    fontFamily: ProductSans.regular,
    color: Colors.greyTextColor,
    marginBottom: 3,
    marginTop: 3
  },
  bigText: {
    color: Colors.greyTextColor,
    fontSize: 40,
    fontFamily: ProductSans.bold
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  gradient: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    borderRadius: 10,
    flexBasis: "40%",
    flexGrow: 0
  }
});
