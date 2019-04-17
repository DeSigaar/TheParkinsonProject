import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store";

import ApiKeys from "./constants/ApiKeys";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

export default class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.any
  };

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
    return Promise.all([
      Asset.loadAsync([require("./assets/icon.png"), require("./assets/auth_background.jpg")]),
      Font.loadAsync({
        "product-sans": require("./assets/fonts/ProductSansRegular.ttf"),
        "product-sans-bold": require("./assets/fonts/ProductSansBold.ttf"),
        "product-sans-italic": require("./assets/fonts/ProductSansItalic.ttf"),
        "product-sans-bold-italic": require("./assets/fonts/ProductSansBoldItalic.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete, isAuthenticationReady, isAuthenticated } = this.state;
    const { skipLoadingScreen } = this.props;

    if ((!isLoadingComplete || !isAuthenticationReady) && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>{isAuthenticated ? <AppNavigator /> : <AuthNavigator />}</View>
        </Provider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
