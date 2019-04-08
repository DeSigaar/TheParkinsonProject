import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";

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
    const variable = navigation.getParam("variable", 0);

    return (
      <View style={styles.container}>
        <Text>Second screen (Variable: {variable})</Text>
<<<<<<< HEAD
        <Button title="Go back" onPress={() => navigate("First")} />
=======
        <Button title="Go back" onPress={() => navigate("Test")} />
>>>>>>> 95c2e305864e44a4cf93497e2e0f910c7c37b0ef
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
