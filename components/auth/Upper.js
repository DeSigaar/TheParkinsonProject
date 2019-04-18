import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class Upper extends Component {
  static propTypes = {
    top: PropTypes.string,
    top2: PropTypes.string,
    bottom: PropTypes.string
  };

  render() {
    const { top, top2, bottom } = this.props;
    return (
      <View style={styles.container}>
        {top || top2 ? (
          <View style={styles.upperTop}>
            {top ? <Text style={styles.h1}>{top}</Text> : null}
            {top2 ? <Text style={styles.h1}>{top2}</Text> : null}
          </View>
        ) : null}
        {bottom ? (
          <View style={styles.upperBottom}>
            <Text style={styles.h2}>{bottom}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  upperTop: {},
  upperBottom: {
    marginTop: 20
  },
  h1: {
    fontFamily: "product-sans-bold",
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center"
  },
  h2: {
    fontFamily: "product-sans",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center"
  }
});
