import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo";
import PropTypes from "prop-types";
import moment from "moment";

import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import ProductSans from "../constants/fonts/ProductSans";

export default class Moments extends Component {
  static propTypes = {
    moments: PropTypes.array,
    colors: PropTypes.array,
    handlePress: PropTypes.func
  };

  render() {
    const { moments, colors, handlePress } = this.props;

    const sortedMoments = moments.sort((a, b) => {
      return a.time.seconds - b.time.seconds;
    });

    return sortedMoments.map((sortedMoment, i) => {
      let icon;
      if (sortedMoment.icon) {
        switch (sortedMoment.icon) {
          case "tandenpoetsen.png":
            icon = require("../assets/images/icon/moments/tandenpoetsen.png");
            break;
          case "opstaan.png":
            icon = require("../assets/images/icon/moments/opstaan.png");
            break;
          case "ontbijt.png":
            icon = require("../assets/images/icon/moments/ontbijt.png");
            break;
          case "lunch.png":
            icon = require("../assets/images/icon/moments/lunch.png");
            break;
          case "tussendoortje.png":
            icon = require("../assets/images/icon/moments/tussendoortje.png");
            break;
          case "avondeten.png":
            icon = require("../assets/images/icon/moments/avondeten.png");
            break;
          case "slapen.png":
            icon = require("../assets/images/icon/moments/slapen.png");
            break;
          default:
            break;
        }
      }

      const zeroStyle = sortedMoment.count === 0 ? styles.isZero : styles.isGood;

      return (
        <View key={sortedMoment.id} style={styles.container}>
          <LinearGradient style={styles.gradient} colors={colors} start={[0, 0]} end={[1, 1]} locations={[0.3, 1]}>
            <View style={styles.inner}>
              <View style={styles.info}>
                {sortedMoment.icon ? <Image source={icon} style={styles.image} /> : <View style={styles.image} />}
                <Text style={[styles.text, styles.time]}>
                  {moment(sortedMoment.time.seconds * 1000).format("HH:mm")}
                </Text>
                <Text style={styles.text}>{sortedMoment.name}</Text>
              </View>
              <View style={styles.counter}>
                <TouchableOpacity activeOpacity={0.4} onPress={() => handlePress(i, "remove")}>
                  <MaterialIcons style={[styles.icon, zeroStyle]} name="remove" />
                </TouchableOpacity>
                <Text style={[styles.text, styles.counterText]}>{sortedMoment.count}</Text>
                <TouchableOpacity activeOpacity={0.4} onPress={() => handlePress(i, "add")}>
                  <MaterialIcons style={styles.icon} name="add" />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    marginBottom: 5
  },
  gradient: {
    height: 65,
    borderRadius: 10,
    padding: 10
  },
  inner: {
    height: 39,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  image: {
    width: 28,
    height: 28,
    marginLeft: 5,
    marginRight: 5,
    resizeMode: "contain"
  },
  text: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: ProductSans.regular
  },
  time: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5
  },
  info: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  isZero: {
    opacity: 0.6
  },
  isGood: {
    opacity: 1
  },
  counter: {
    width: 75,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  counterText: {
    fontSize: 26
  },
  icon: {
    color: Colors.white,
    fontSize: 26
  }
});
