import React, { Component } from "react";
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
