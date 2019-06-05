import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import PropTypes from "prop-types";
import Gradients from "../../constants/Gradients";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class DeleteButton extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    gradient: PropTypes.array,
    text: PropTypes.string
  };

  static defaultProps = {
    gradient: Gradients.orange,
    text: "Delete"
  };

  render() {
    const { handleSubmit, gradient, text } = this.props;

    return (
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <LinearGradient colors={gradient} start={[0, 0]} end={[1, 1]} locations={[0.3, 1]} style={styles.gradient}>
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    color: Colors.white,
    marginTop: 28,
    marginBottom: 49
  },
  gradient: {
    flex: 1,
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: ProductSans.regular
  }
});
