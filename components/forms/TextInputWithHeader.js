import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, Text } from "react-native";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class TextInputWithHeader extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  };

  render() {
    const { header, onChangeText, value } = this.props;

    return (
      <>
        <Text style={styles.inputHeader}>{header}</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeText} value={value} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputHeader: {
    fontSize: 20,
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    marginBottom: 8
  },
  textInput: {
    flex: 1,
    height: 50,
    borderColor: Colors.greyTextColor,
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 14,
    fontFamily: ProductSans.regular
  }
});
