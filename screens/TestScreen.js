import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";
import { TestComponent } from "../components/AppComponents";

export default class TestScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Test"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text>The Parkinson Project</Text>
        <TestComponent />
        <Button
          title="Go to second screen"
          onPress={() => navigate("Second", { variable: 2 })}
        />
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
