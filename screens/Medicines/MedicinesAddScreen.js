import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import Gradients from "../../constants/Gradients";

class MedicinesAdd extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "MedicinesAddScreen"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Go back" />
        <Text>yasdasdasdo</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "#ffffff",
    height: "100%",
    width: "100%",
    paddingTop: "10%"
  }
});

export default MedicinesAdd;
