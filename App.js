import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AppLoading } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import ApiKeys from "./constants/ApiKeys";
import * as firebase from "firebase";

export default class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Firebase only when it hasn't been initialized yet
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);
  }

  render() {
    return <AppNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
