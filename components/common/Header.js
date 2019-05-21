import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import PropTypes from "prop-types";

import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Header extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    backButton: PropTypes.bool,
    title: PropTypes.string.isRequired,
    actionType1: PropTypes.string,
    actionPress1: PropTypes.func,
    actionType2: PropTypes.string,
    actionPress2: PropTypes.func,
    actionType3: PropTypes.string,
    actionPress3: PropTypes.func
  };

  static defaultProps = {
    backButton: true
  };

  render() {
    const {
      title,
      navigation,
      backButton,
      actionType1,
      actionPress1,
      actionType2,
      actionPress2,
      actionType3,
      actionPress3
    } = this.props;

    return (
      <View style={[styles.container, Platform.OS === "ios" && styles.ios]}>
        <View style={styles.side}>
          {backButton && (
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
              <MaterialIcons style={styles.icon} name="arrow-back" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.superSide}>
          {actionType1 && (
            <TouchableOpacity activeOpacity={0.6} onPress={() => actionPress1()}>
              <MaterialIcons style={styles.icon} name={actionType1} />
            </TouchableOpacity>
          )}
          {actionType2 && (
            <TouchableOpacity activeOpacity={0.6} onPress={() => actionPress2()}>
              <MaterialIcons style={styles.icon} name={actionType2} />
            </TouchableOpacity>
          )}
          {actionType3 && (
            <TouchableOpacity activeOpacity={0.6} onPress={() => actionPress3()}>
              <MaterialIcons style={styles.icon} name={actionType3} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 32,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 5,
    backgroundColor: Colors.white
  },
  ios: {
    paddingTop: 52,
    height: 100
  },
  side: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center"
  },
  superSide: {
    height: 56,
    width: 140,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  center: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  icon: {
    fontSize: 28,
    color: Colors.greyTextColor
  },
  title: {
    fontSize: 26,
    fontFamily: ProductSans.bold,
    color: Colors.greyTextColor
  }
});
