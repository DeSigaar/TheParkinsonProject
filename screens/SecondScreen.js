import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import Button from "../components/common/Button";

export default class SecondScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Second"
  };

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;
    const variable = navigation.getParam("variable", "default");
    return (
      <View style={styles.container}>
        <Text>Second screen (Variable: {variable})</Text>
        <Button onPress={() => navigate("First")}>Go back</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
