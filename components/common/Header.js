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
    actionPress3: PropTypes.func,
    amountActions: PropTypes.number
  };

  static defaultProps = {
    backButton: true,
    amountActions: 0
  };

  renderActionButtons = () => {
    const {
      actionType1,
      actionPress1,
      actionType2,
      actionPress2,
      actionType3,
      actionPress3,
      amountActions
    } = this.props;

    switch (amountActions) {
      case 3:
        return (
          <View style={styles.superSide}>
            {actionType1 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress1()}>
                <MaterialIcons style={styles.icon} name={actionType1} />
              </TouchableOpacity>
            )}
            {actionType2 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress2()}>
                <MaterialIcons style={styles.icon} name={actionType2} />
              </TouchableOpacity>
            )}
            {actionType3 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress3()}>
                <MaterialIcons style={styles.icon} name={actionType3} />
              </TouchableOpacity>
            )}
          </View>
        );
      case 2:
        return (
          <View style={styles.lessSuperSide}>
            {actionType1 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress1()}>
                <MaterialIcons style={styles.icon} name={actionType1} />
              </TouchableOpacity>
            )}
            {actionType2 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress2()}>
                <MaterialIcons style={styles.icon} name={actionType2} />
              </TouchableOpacity>
            )}
          </View>
        );
      case 1:
        return (
          <View style={styles.side}>
            {actionType1 && (
              <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => actionPress1()}>
                <MaterialIcons style={styles.icon} name={actionType1} />
              </TouchableOpacity>
            )}
          </View>
        );
      default:
      case 0:
        return <View style={styles.side} />;
    }
  };

  render() {
    const { title, navigation, backButton } = this.props;

    return (
      <View style={[styles.container, Platform.OS === "ios" && styles.ios]}>
        <View style={styles.side}>
          {backButton && (
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => navigation.goBack()}>
              <MaterialIcons style={styles.icon} name="arrow-back" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {this.renderActionButtons()}
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
    height: 84,
    paddingTop: 36,
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
    width: 158,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  lessSuperSide: {
    height: 56,
    width: 104,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: "center",
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
