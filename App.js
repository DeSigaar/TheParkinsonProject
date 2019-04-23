import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import * as firebase from "firebase";
import { Provider, connect } from "react-redux";
// import { setCurrentUser } from "./store/actions/authActions";
import store from "./store";

import ApiKeys from "./constants/ApiKeys";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      user: {}
    };

    // Initialize Firebase only when it hasn't been initialized yet
    if (!firebase.apps.length) firebase.initializeApp(ApiKeys.FirebaseConfig);
    firebase.auth().languageCode = "nl";
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    this.setState({ user });
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("./assets/images/icon/icon.png"), require("./assets/images/auth/background.jpg")]),
      Font.loadAsync({
        "product-sans": require("./assets/fonts/ProductSans/ProductSansRegular.ttf"),
        "product-sans-bold": require("./assets/fonts/ProductSans/ProductSansBold.ttf"),
        "product-sans-italic": require("./assets/fonts/ProductSans/ProductSansItalic.ttf"),
        "product-sans-bold-italic": require("./assets/fonts/ProductSans/ProductSansBoldItalic.ttf")
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
    const { isLoadingComplete, isAuthenticationReady, isAuthenticated, user } = this.state;
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
          {Platform.OS === "ios" && (
            <StatusBar animated={true} barStyle={isAuthenticated ? "default" : "light-content"} />
          )}
          <View style={styles.container}>{isAuthenticated ? <AppNavigator user={user} /> : <AuthNavigator />}</View>
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//     ...ownProps,
//     user: state.auth.user
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     ...ownProps,
//     setCurrentUser: user => {
//       dispatch(setCurrentUser(user));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
