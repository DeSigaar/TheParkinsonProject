import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PropTypes from "prop-types";


export default class ExerciseHomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: "Second"
  };

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    const variable = navigation.getParam("variable", 1);
    return (
      <View style={styles.container}>
        <Text>Second screen (Variable: {variable})</Text>
        <Text>Test</Text>
        <Button title="Add exersize ofzo" onPress={() => navigation.navigate("ExersizeAddScreen")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
