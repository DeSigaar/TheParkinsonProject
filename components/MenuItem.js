import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo";

export default class MenuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
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
          <Image style={styles.image} source={{ uri: this.props.img }} />
          <Text>{this.props.title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    // flex: 1,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
    alignSelf: "baseline",
    flexWrap: "wrap",
    flexBasis: "45%",
    flexGrow: 1
    // flexGrow: 0,
    // flexShrink: 0
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10
  },
  gradient: {
    padding: 25,
    alignItems: "center",
    borderRadius: 5

    // elevation: 1,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8
    // shadowRadius: 2
  }
});
