import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";
import Gradients from "../../constants/Gradients";

export default class SchemaItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.any,
    gradientColor: PropTypes.array
    // onPress: PropTypes.func
  };

  render() {
    return (
      <LinearGradient
        style={styles.gradient}
        colors={this.props.gradientColor}
        start={[0, 0]}
        end={[1, 1]}
        locations={[0.3, 1]}
      >
        <Image style={styles.image} source={this.props.img} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.textBig}>{this.props.title}</Text>
          <Text style={styles.text}>{this.props.description}</Text>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    marginTop: 5,
    fontFamily: "product-sans"
  },
  textBig: {
    color: Colors.white,
    marginTop: 3,
    fontSize: 22,
    fontFamily: "product-sans"
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
