import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";

export default class MenuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.any,
    gradientColor: PropTypes.array,
    onPress: PropTypes.func
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.item} onPress={this.props.onPress}>
        <LinearGradient
          colors={this.props.gradientColor}
          start={[0, 0]}
          end={[1, 1]}
          locations={[0.3, 1]}
          style={styles.gradient}
        >
          <Image style={styles.image} source={this.props.img} resizeMode="contain" />
          <Text style={styles.text}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
    alignSelf: "baseline",
    flexWrap: "wrap",
    flexBasis: "45%",
    flexGrow: 1
  },
  text: {
    color: Colors.whiteTextColor,
    fontWeight: "bold",
    marginTop: 5
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  gradient: {
    elevation: 5,
    padding: 25,
    alignItems: "center",
    borderRadius: 10
    // shadowColor: "#000",
    // shadowOffset: { width: 20, height: 20 },
    // shadowOpacity: 1,
    // shadowRadius: 20
  }
});
