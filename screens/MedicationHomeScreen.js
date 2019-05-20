import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import PropTypes from "prop-types";

import { Header } from "../components/common";

export default class MedicationHomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;

    //(body)
    return (
      <>
        <Header
          navigation={navigation}
          title="Medicatie"
          actionType1="add"
          actionType2="delete"
          actionType3="arrow-left"
          // actionPress1={() => navigation.navigate("Exercise")}
        />
        <View style={[styles.container, Platform.OS === "ios" && styles.ios]} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20
  },
  ios: {
    marginTop: 100
  }
});
