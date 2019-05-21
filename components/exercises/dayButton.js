import React, { Component } from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class dayButton extends Component {
  static propTypes = {
    buttonState: PropTypes.bool,
    buttonText: PropTypes.string,
    toggleButton: PropTypes.func
  };
  render() {
    const { buttonState, buttonText, toggleButton } = this.props;
    return (
      <TouchableHighlight
        style={buttonState ? styles.weekButtonsBoxActive : styles.weekButtonsBoxInActive}
        onPress={toggleButton}
      >
        <View style={styles.weekButton}>
          <Text style={styles.weekButtonText}>{buttonText}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  weekButtonsBoxActive: {
    width: 40,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    height: 40,
    borderRadius: 20000,
    backgroundColor: "green"
  },
  weekButtonsBoxInActive: {
    width: 40,
    marginTop: 10,
    opacity: 0.4,
    marginBottom: 10,
    justifyContent: "center",
    height: 40,
    borderRadius: 20000,
    backgroundColor: "#489428"
  },
  weekButtonText: {
    color: "white",
    textAlign: "center"
  },
  weekButton: {
    textAlign: "center"
  }
});
