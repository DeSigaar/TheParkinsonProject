import React, { Component } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset } from "expo";
import * as firebase from "firebase";

import ApiKeys from "./constants/ApiKeys";

import RootNavigator from "./navigation/RootNavigator";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false
    };

    // Initialize Firebase only when it hasn't been initialized yet
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
  };

  _loadResourcesAsync = async () => {
    return Promise.all([Asset.loadAsync([require("./assets/icon.png")])]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          {Platform.OS === "android" && <View style={styles.statusBarUnderlay} />}
          {this.state.isAuthenticated ? <AppNavigator /> : <RootNavigator />}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
});
