import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo";
import Colors from "../../constants/Colors";

export default class Upcoming extends Component {
  static propTypes = {
    img: PropTypes.any,
    gradientColor: PropTypes.array,
    onPress: PropTypes.func
  };

  // let img = this.props.img;

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.container}>
        <LinearGradient
          colors={this.props.gradientColor}
          start={[0, 0]}
          end={[1, 1]}
          locations={[0.3, 1]}
          style={styles.gradient}
        >
          <Image style={styles.image} source={this.props.img} resizeMode="contain" />
        </LinearGradient>
        <View style={styles.textContainer}>
          <View style={styles.text}>
            <Text style={styles.smallText}>Neem uw medicatie over</Text>
            <Text style={styles.bigText}>2 uur</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
    marginBottom: 7,
    alignSelf: "baseline",
    flexWrap: "wrap",
    flexBasis: "90%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    elevation: 4,
    backgroundColor: "#FFFFFF",
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
    fontFamily: "product-sans",
    color: Colors.greyTextColor,
    marginBottom: 3,
    marginTop: 3
  },
  bigText: {
    color: Colors.greyTextColor,
    fontSize: 40,
    fontFamily: "product-sans-bold"
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
