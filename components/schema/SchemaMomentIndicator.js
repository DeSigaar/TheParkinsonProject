import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class SchemaMomentIndicator extends Component {
  static propTypes = {
    moment: PropTypes.string,
    children: PropTypes.any
  };
  render() {
    const { moment, children } = this.props;

    return (
      <>
        <Text style={styles.text}>{moment}</Text>
        <View style={styles.border}>{children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.lightGrey,
    marginTop: 15,
    fontSize: 16,
    fontFamily: ProductSans.regular,
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
