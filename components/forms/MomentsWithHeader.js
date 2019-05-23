import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Moments } from "../common";
import Gradients from "../../constants/Gradients";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class MomentsWithHeader extends Component {
  static propTypes = {
    header: PropTypes.string,
    moments: PropTypes.array.isRequired,
    gradient: PropTypes.array,
    handlePressMoment: PropTypes.func.isRequired
  };

  static defaultProps = {
    header: "Kies momenten",
    gradient: Gradients.orange
  };

  render() {
    const { header, moments, gradient, handlePressMoment } = this.props;

    return (
      <>
        <Text style={styles.header}>{header}</Text>
        <Moments
          moments={moments}
          colors={gradient}
          handlePress={(position, type) => handlePressMoment(position, type)}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    marginTop: 14,
    marginBottom: 8
  }
});
