import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Upper extends Component {
  static propTypes = {
    top: PropTypes.string,
    underTop: PropTypes.string,
    bottom: PropTypes.string
  };

  render() {
    const { top, underTop, bottom } = this.props;

    return (
      <View style={styles.container}>
        {(top || underTop) && (
          <View>
            {top && <Text style={[styles.h1, Platform.OS === "android" && styles.androidH1]}>{top}</Text>}
            {underTop && <Text style={[styles.h1, Platform.OS === "android" && styles.androidH1]}>{underTop}</Text>}
          </View>
        )}
        {bottom && (
          <View style={styles.upperBottom}>
            <Text style={[styles.h2, Platform.OS === "android" && styles.androidH2]}>{bottom}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    marginTop: -15,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  upperBottom: {
    marginTop: 15
  },
  h1: {
    fontFamily: ProductSans.bold,
    color: Colors.white,
    fontSize: 25,
    textAlign: "center"
  },
  h2: {
    fontFamily: ProductSans.regular,
    color: Colors.white,
    fontSize: 20,
    textAlign: "center"
  },
  androidH1: {
    fontSize: 21
  },
  androidH2: {
    fontSize: 16
  }
});
