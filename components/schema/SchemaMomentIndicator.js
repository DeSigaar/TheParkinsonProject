import React, { Component } from "react";
import Colors from "../../constants/Colors";
import PropTypes from "prop-types";
import { Text, StyleSheet, View } from "react-native";

export default class SchemaMomentIndicator extends Component {
  static propTypes = {
    moment: PropTypes.string
  };
  render() {
    return (
      <>
        <Text style={styles.text}>{this.props.moment}</Text>
        <View style={styles.border}>{this.props.children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.lightGrey,
    marginTop: 15,
    fontSize: 16,
    fontFamily: "product-sans",
    marginBottom: 5
  },
  border: {
    paddingTop: 5,
    paddingBottom: 5,
    borderLeftWidth: 1,
    borderColor: Colors.lightGrey,
    paddingLeft: 10
  }
});
