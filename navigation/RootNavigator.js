import React, { Component } from "react";
import { Notifications } from "expo";
import { createAppContainer, createStackNavigator } from "react-navigation";
import AppNavigator from "./AppNavigator";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

import LoginScreen from "./../screens/auth/LoginScreen";
import SignupScreen from "./../screens/auth/SignupScreen";
import ForgotPasswordScreen from "./../screens/auth/ForgotPasswordScreen";

const RootStackNavigator = createAppContainer(
  createStackNavigator(
    {
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      ForgotPassword: { screen: ForgotPasswordScreen },
      App: { screen: AppNavigator }
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

export default class RootNavigator extends Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    // eslint-disable-next-line no-console
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
