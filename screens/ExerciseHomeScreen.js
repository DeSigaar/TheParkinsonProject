import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { Header } from "../components/common";

export default class ExerciseHomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;
    const variable = getParam("variable", 1);
    return (
      <>
        <Header navigation={navigation} title="Oefeningen" />
        <View style={styles.container}>
          <Text>Screen with variable {variable}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20
  }
});
